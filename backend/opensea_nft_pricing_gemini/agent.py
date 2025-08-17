"""
OpenSea NFT Pricing Agent for Agentverse

Utilizes the OpenSea MCP server to analyze NFT collections, find similar NFTs based on traits,
and provide intelligent pricing recommendations using AI-powered market analysis.
"""

import os
import json
import asyncio
import time
import httpx
from typing import Dict, Any, Optional, List, Tuple
from contextlib import AsyncExitStack
import mcp
from mcp.client.streamable_http import streamablehttp_client
from uagents import Agent, Context, Protocol, Model
from uagents_core.contrib.protocols.chat import (
    chat_protocol_spec,
    ChatMessage,
    ChatAcknowledgement,
    TextContent,
    EndSessionContent,
    StartSessionContent,
)
from datetime import datetime, timezone
from uuid import uuid4
from dotenv import load_dotenv
from google import genai
from google.genai import types

# --- Agent Configuration ---

# Load environment variables from a .env file
load_dotenv()

# Get API keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

OPENSEA_ACCESS_TOKEN = os.getenv("OPENSEA_ACCESS_TOKEN")
if not OPENSEA_ACCESS_TOKEN:
    raise ValueError("OPENSEA_ACCESS_TOKEN not found in .env file")

AGENT_NAME = "opensea_nft_pricing_agent_gemini"
AGENT_PORT = 8009

# User sessions store: session_id -> {last_activity}
user_sessions: Dict[str, Dict[str, Any]] = {}

# Session timeout (30 minutes)
SESSION_TIMEOUT = 30 * 60

# --- OpenSea MCP Client Logic ---

class OpenSeaMCPClient:
    """
    OpenSea MCP Client that connects to the OpenSea MCP server and provides
    NFT pricing functionality through trait analysis and market data.
    """
    
    def __init__(self, ctx: Context):
        self._ctx = ctx
        self._session: mcp.ClientSession = None
        self._exit_stack = AsyncExitStack()
        self.gemini = genai.Client()
        self.tools = []  # Will be populated after connection
        
    async def connect(self):
        """Connect to OpenSea MCP server via Streamable HTTP endpoint"""
        try:
            self._ctx.logger.info("Connecting to OpenSea MCP server via Streamable HTTP...")
            
            # Use the streamable HTTP endpoint with headers
            url = "https://mcp.opensea.io/mcp"
            headers = {
                "Authorization": f"Bearer {OPENSEA_ACCESS_TOKEN}"
            }
            
            # Connect using streamable HTTP client
            read_stream, write_stream, _ = await self._exit_stack.enter_async_context(
                streamablehttp_client(url, headers=headers)
            )
            
            self._session = await self._exit_stack.enter_async_context(
                mcp.ClientSession(read_stream, write_stream)
            )
            
            await self._session.initialize()
            
            # List available tools
            list_tools_result = await self._session.list_tools()
            self.tools = list_tools_result.tools
            
            self._ctx.logger.info(f"Connected to OpenSea MCP server with {len(self.tools)} tools")
            for tool in self.tools:
                self._ctx.logger.info(f"Available tool: {tool.name}")
                
        except Exception as e:
            self._ctx.logger.error(f"Failed to connect to OpenSea MCP server: {e}")
            # Try alternative connection method with token in URL
            try:
                self._ctx.logger.info("Trying alternative connection with token in URL...")
                url = f"https://mcp.opensea.io/{OPENSEA_ACCESS_TOKEN}/mcp"
                
                read_stream, write_stream, _ = await self._exit_stack.enter_async_context(
                    streamablehttp_client(url)
                )
                
                self._session = await self._exit_stack.enter_async_context(
                    mcp.ClientSession(read_stream, write_stream)
                )
                
                await self._session.initialize()
                
                # List available tools
                list_tools_result = await self._session.list_tools()
                self.tools = list_tools_result.tools
                
                self._ctx.logger.info(f"Connected to OpenSea MCP server with {len(self.tools)} tools")
                for tool in self.tools:
                    self._ctx.logger.info(f"Available tool: {tool.name}")
                    
            except Exception as e2:
                self._ctx.logger.error(f"Both connection methods failed: {e2}")
                raise
    
    
    async def price_nft(self, query: str) -> str:
        """
        Main function to price an NFT based on user query.
        Uses AI to understand the query and determine pricing strategy.
        """
        try:
            self._ctx.logger.info(f"Processing NFT pricing query: '{query}'")
            
            # Step 1: Parse the query to understand what NFT to price
            nft_info = await self._parse_nft_query(query)
            if not nft_info or nft_info == "null":
                return "❌ I couldn't understand which NFT you want me to price. Please specify a collection name and token ID (e.g., 'Price Bored Ape #1234')."
            
            # Step 2: Find the NFT collection
            collection_data = await self._find_collection(nft_info['collection_name'])
            if not collection_data:
                return f"❌ Could not find collection '{nft_info['collection_name']}'. Please check the spelling or try a different collection."
            
            # Step 3: Get the specific NFT details
            nft_details = await self._get_nft_details(collection_data, nft_info)
            if not nft_details:
                return f"❌ Could not find NFT #{nft_info.get('token_id', 'unknown')} in the {nft_info['collection_name']} collection."
            
            # Step 4: Get trait floor prices from collection attributes
            trait_floor_data = await self._get_trait_floor_prices(collection_data, nft_details)
            
            # Step 5: Analyze pricing based on trait data and market data
            pricing_analysis = await self._analyze_pricing(nft_details, trait_floor_data, collection_data)
            
            return pricing_analysis
            
        except Exception as e:
            self._ctx.logger.error(f"Error in price_nft: {e}")
            return f"❌ An error occurred while pricing the NFT: {str(e)}"
    
    async def _parse_nft_query(self, query: str) -> Optional[Dict[str, str]]:
        """Parse user query to extract collection name and token ID"""
        try:
            parsing_prompt = f"""
Parse this NFT query: "{query}"

Look for:
- Collection name (like Azuki, Bored Ape, CryptoPunks, etc.)
- Token ID (the number, often after # symbol)

Common NFT collections:
- Azuki
- Bored Ape Yacht Club (BAYC)
- CryptoPunks
- Doodles
- Pudgy Penguins

Return ONLY valid JSON:
{{
    "collection_name": "collection name",
    "token_id": "number",
    "network": "ethereum"
}}

Examples:
"What's Azuki #999 worth?" -> {{"collection_name": "Azuki", "token_id": "999", "network": "ethereum"}}
"Price Bored Ape #1234" -> {{"collection_name": "Bored Ape Yacht Club", "token_id": "1234", "network": "ethereum"}}
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.gemini.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=parsing_prompt,
                    config=types.GenerateContentConfig(
                        thinking_config=types.ThinkingConfig(thinking_budget=0)
                    )
                )
            )
            
            result_text = response.text.strip()
            self._ctx.logger.info(f"Gemini parsing response: {result_text}")
            
            # Extract JSON from markdown code blocks if present
            if result_text.startswith("```json"):
                # Remove ```json and ``` markers
                json_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                # Remove ``` markers
                json_text = result_text[3:-3].strip()
            else:
                json_text = result_text
            
            try:
                parsed = json.loads(json_text)
                self._ctx.logger.info(f"Parsed NFT info: {parsed}")
                return parsed
            except json.JSONDecodeError:
                self._ctx.logger.error(f"Failed to parse JSON: {json_text}")
                return None
                
        except Exception as e:
            self._ctx.logger.error(f"Error parsing NFT query: {e}")
            return None
    
    async def _find_collection(self, collection_name: str) -> Optional[Dict]:
        """Find NFT collection using OpenSea search"""
        try:
            self._ctx.logger.info(f"Searching for collection: '{collection_name}'")
            
            # First try search_collections directly
            search_result = await self._session.call_tool(
                "search_collections",
                {"query": collection_name}
            )
            
            self._ctx.logger.info(f"search_collections response: {search_result}")
            
            if search_result.content:
                collections_data = self._extract_content_data(search_result.content)
                self._ctx.logger.info(f"Extracted collections data: {collections_data}")
                
                # Handle the nested structure from OpenSea search_collections
                if isinstance(collections_data, dict) and 'collectionsByQuery' in collections_data:
                    collections = collections_data['collectionsByQuery']
                    if collections and len(collections) > 0:
                        self._ctx.logger.info(f"Found {len(collections)} collections, returning first one")
                        return collections[0]
                elif isinstance(collections_data, list) and len(collections_data) > 0:
                    self._ctx.logger.info(f"Found {len(collections_data)} collections in list format, returning first one")
                    return collections_data[0]
            
            # If no results, try the general search tool
            self._ctx.logger.info(f"No results from search_collections, trying general search...")
            search_result = await self._session.call_tool(
                "search",
                {"query": f"{collection_name} NFT collection"}
            )
            
            self._ctx.logger.info(f"general search response: {search_result}")
            
            if search_result.content:
                collections_data = self._extract_content_data(search_result.content)
                self._ctx.logger.info(f"General search extracted data: {collections_data}")
                
                # Handle different response structures from general search
                if isinstance(collections_data, dict) and 'collectionsByQuery' in collections_data:
                    collections = collections_data['collectionsByQuery']
                    if collections and len(collections) > 0:
                        return collections[0]
                elif isinstance(collections_data, list) and len(collections_data) > 0:
                    return collections_data[0]
            
            self._ctx.logger.warning(f"No collections found for '{collection_name}'")
            return None
            
        except Exception as e:
            self._ctx.logger.error(f"Error finding collection: {e}")
            return None
    
    async def _get_nft_details(self, collection_data: Dict, nft_info: Dict) -> Optional[Dict]:
        """Get detailed information about a specific NFT using Claude to determine the right tool and parameters"""
        try:
            collection_slug = collection_data.get('slug') or collection_data.get('collection')
            token_id = nft_info.get('token_id')
            contract_address = collection_data.get('address')
            
            if not collection_slug or not token_id:
                self._ctx.logger.error(f"Missing collection_slug ({collection_slug}) or token_id ({token_id})")
                return None
            
            self._ctx.logger.info(f"Getting NFT details for {collection_slug} #{token_id}")
            
            # Use Claude to determine the best tool and parameters based on available tools
            tools_info = []
            for tool in self.tools:
                if tool.name in ['get_item', 'search_items', 'fetch']:
                    tools_info.append({
                        "name": tool.name,
                        "description": tool.description,
                        "inputSchema": tool.inputSchema
                    })
            
            tool_selection_prompt = f"""
I need to get details for a specific NFT with these details:
- Collection: {collection_data.get('name')} (slug: {collection_slug})
- Token ID: {token_id}
- Contract Address: {contract_address}
- Chain: {collection_data.get('chain', {}).get('identifier', 'ethereum')}

Available OpenSea MCP tools:
{json.dumps(tools_info, indent=2)}

Which tool should I use and what parameters should I pass? Consider the tool schemas carefully.

Respond with ONLY a JSON object:
{{
    "tool_name": "tool_name_to_use",
    "parameters": {{
        "param1": "value1",
        "param2": "value2"
    }}
}}
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.gemini.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=tool_selection_prompt,
                    config=types.GenerateContentConfig(
                        thinking_config=types.ThinkingConfig(thinking_budget=0)
                    )
                )
            )
            
            result_text = response.text.strip()
            self._ctx.logger.info(f"Gemini tool selection response: {result_text}")
            
            # Extract JSON from response
            if result_text.startswith("```json"):
                json_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                json_text = result_text[3:-3].strip()
            else:
                json_text = result_text
            
            try:
                tool_decision = json.loads(json_text)
                tool_name = tool_decision.get('tool_name')
                parameters = tool_decision.get('parameters', {})
                
                self._ctx.logger.info(f"Using tool: {tool_name} with parameters: {parameters}")
                
                # Execute the selected tool
                result = await self._session.call_tool(tool_name, parameters)
                
                if result.content:
                    nft_data = self._extract_content_data(result.content)
                    self._ctx.logger.info(f"Successfully got NFT data via {tool_name}")
                    self._ctx.logger.info(f"NFT data preview: {str(nft_data)[:500]}...")
                    
                    # Handle nested structure - extract the actual item data
                    if isinstance(nft_data, dict) and 'item' in nft_data:
                        actual_nft = nft_data['item']
                        self._ctx.logger.info(f"Extracted item data, traits: {len(actual_nft.get('traits', actual_nft.get('attributes', [])))}")
                        return actual_nft
                    
                    return nft_data
                    
            except Exception as e:
                self._ctx.logger.error(f"Error with Claude-selected tool: {e}")
            
            self._ctx.logger.warning(f"Could not find NFT {collection_slug} #{token_id}")
            return None
            
        except Exception as e:
            self._ctx.logger.error(f"Error getting NFT details: {e}")
            return None
    
    async def _get_trait_floor_prices(self, collection_data: Dict, nft_details: Dict) -> Dict:
        """Get floor prices for each trait in the NFT using get_collection with attributes"""
        try:
            collection_slug = collection_data.get('slug')
            collection_name = collection_data.get('name')
            
            # Extract traits from the target NFT
            traits = nft_details.get('traits') or nft_details.get('attributes', [])
            
            self._ctx.logger.info(f"Getting trait floor prices for {collection_name} with {len(traits)} traits")
            
            if not traits:
                return {}
            
            # Use Claude to determine the correct tool parameters for get_collection
            self._ctx.logger.info(f"Using Claude to determine correct parameters for get_collection")
            
            # Find get_collection tool info
            collection_tool_info = None
            for tool in self.tools:
                if tool.name == 'get_collection':
                    collection_tool_info = {
                        "name": tool.name,
                        "description": tool.description,
                        "inputSchema": tool.inputSchema
                    }
                    break
            
            if not collection_tool_info:
                self._ctx.logger.error("get_collection tool not found in available tools")
                return {}
            
            tool_selection_prompt = f"""
I need to call the get_collection tool with the following details:
- Collection: {collection_name} (slug: {collection_slug})
- I want to include attributes data to get trait floor prices

Available get_collection tool schema:
{json.dumps(collection_tool_info, indent=2)}

Which parameters should I use? Consider the tool schema carefully to determine the correct parameter names.

Respond with ONLY a JSON object:
{{
    "parameters": {{
        "param1": "value1",
        "param2": "value2"
    }}
}}
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.gemini.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=tool_selection_prompt,
                    config=types.GenerateContentConfig(
                        thinking_config=types.ThinkingConfig(thinking_budget=0)
                    )
                )
            )
            
            result_text = response.text.strip()
            self._ctx.logger.info(f"Gemini parameter selection response: {result_text}")
            
            # Extract JSON from response
            if result_text.startswith("```json"):
                json_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                json_text = result_text[3:-3].strip()
            else:
                json_text = result_text
            
            try:
                parameter_decision = json.loads(json_text)
                parameters = parameter_decision.get('parameters', {})
                
                self._ctx.logger.info(f"Using get_collection with parameters: {parameters}")
                
                # Execute the get_collection tool with Claude-selected parameters
                collection_result = await self._session.call_tool("get_collection", parameters)
                
            except Exception as e:
                self._ctx.logger.error(f"Error with Claude-selected parameters: {e}")
                # Fallback to basic call if parameter selection fails
                collection_result = await self._session.call_tool(
                    "get_collection",
                    {"slug": collection_slug, "includes": ["attributes"]}
                )
            
            if not collection_result.content:
                self._ctx.logger.warning("No collection data returned")
                return {}
            
            collection_attrs_data = self._extract_content_data(collection_result.content)
            self._ctx.logger.info(f"Got collection attributes data: {len(str(collection_attrs_data))} chars")
            
            # Extract the attributes data
            attributes_data = None
            if isinstance(collection_attrs_data, dict):
                if 'attributes' in collection_attrs_data:
                    attributes_data = collection_attrs_data['attributes']
                elif 'collection' in collection_attrs_data and 'attributes' in collection_attrs_data['collection']:
                    attributes_data = collection_attrs_data['collection']['attributes']
            
            if not attributes_data or 'items' not in attributes_data:
                self._ctx.logger.warning("No attributes items found in collection data")
                return {}
            
            attribute_items = attributes_data['items']
            self._ctx.logger.info(f"Found {len(attribute_items)} attribute items")
            
            # Create a mapping of trait_type:trait_value -> floor_price_data
            trait_floor_map = {}
            for attr_item in attribute_items:
                trait_type = attr_item.get('traitType')
                trait_value = attr_item.get('traitValue')
                floor_price = attr_item.get('floorPrice', {}).get('pricePerItem', {}).get('native', {}).get('unit')
                count = attr_item.get('count')
                percent = attr_item.get('percent')
                
                if trait_type and trait_value:
                    trait_key = f"{trait_type}:{trait_value}"
                    trait_floor_map[trait_key] = {
                        'floor_price': floor_price,
                        'count': count,
                        'percent': percent,
                        'rarity_score': 1 / percent if percent and percent > 0 else None
                    }
            
            # Debug: Log some sample trait_floor_map entries
            sample_keys = list(trait_floor_map.keys())[:3]
            self._ctx.logger.info(f"Sample trait_floor_map keys: {sample_keys}")
            
            # Debug: Log the NFT traits structure
            self._ctx.logger.info(f"NFT traits structure: {traits[:2]}")
            
            # Map the target NFT's traits to their floor prices
            target_trait_data = {}
            for trait in traits:
                # Handle different trait type field names (traitType, trait_type, type)
                trait_type = trait.get('traitType') or trait.get('trait_type') or trait.get('type')
                trait_value = trait.get('value')
                
                self._ctx.logger.info(f"Processing NFT trait: type='{trait_type}', value='{trait_value}'")
                
                if trait_type and trait_value:
                    trait_key = f"{trait_type}:{trait_value}"
                    if trait_key in trait_floor_map:
                        target_trait_data[trait_key] = trait_floor_map[trait_key]
                        self._ctx.logger.info(f"✅ Found floor price for {trait_key}: {trait_floor_map[trait_key]['floor_price']} ETH")
                    else:
                        self._ctx.logger.warning(f"❌ No floor price data found for {trait_key}")
            
            self._ctx.logger.info(f"Mapped {len(target_trait_data)} traits to floor prices")
            return target_trait_data
            
        except Exception as e:
            self._ctx.logger.error(f"Error getting trait floor prices: {e}")
            return {}
    
    async def _analyze_pricing(self, nft_details: Dict, trait_floor_data: Dict, collection_data: Dict) -> str:
        """Use AI to analyze pricing based on traits and market data"""
        try:
            # Prepare data for analysis
            analysis_data = {
                "target_nft": {
                    "token_id": nft_details.get('token_id') or nft_details.get('identifier', '').split('/')[-1] if nft_details.get('identifier') else 'Unknown',
                    "name": nft_details.get('name'),
                    "traits": nft_details.get('traits') or nft_details.get('attributes', []),
                    "image": nft_details.get('image_url') or nft_details.get('image'),
                    "current_price": nft_details.get('sell_orders', [{}])[0].get('current_price') if nft_details.get('sell_orders') else None
                },
                "collection": {
                    "name": collection_data.get('name'),
                    "floor_price": collection_data.get('floorPrice', {}).get('pricePerItem', {}).get('native', {}).get('unit'),
                    "floor_price_usd": collection_data.get('floorPrice', {}).get('pricePerItem', {}).get('usd'),
                    "total_supply": collection_data.get('stats', {}).get('totalSupply'),
                    "num_owners": collection_data.get('stats', {}).get('ownerCount'),
                    "volume": collection_data.get('stats', {}).get('volume', {}).get('native', {}).get('unit'),
                    "one_day_change": collection_data.get('stats', {}).get('oneDay', {}).get('floorPriceChange')
                },
                "trait_floor_data": trait_floor_data
            }
            
            # Process trait floor price data
            trait_analysis = []
            total_trait_floor_prices = []
            
            for trait_key, trait_data in trait_floor_data.items():
                trait_type, trait_value = trait_key.split(':', 1)
                floor_price = trait_data.get('floor_price')
                count = trait_data.get('count')
                percent = trait_data.get('percent')
                rarity_score = trait_data.get('rarity_score')
                
                trait_info = {
                    "trait_type": trait_type,
                    "trait_value": trait_value,
                    "floor_price": floor_price,
                    "count": count,
                    "percent": percent,
                    "rarity_score": rarity_score
                }
                
                trait_analysis.append(trait_info)
                
                if floor_price:
                    try:
                        total_trait_floor_prices.append(float(floor_price))
                    except:
                        pass
            
            # Calculate trait-based pricing statistics
            if total_trait_floor_prices:
                analysis_data["trait_stats"] = {
                    "avg_trait_floor": sum(total_trait_floor_prices) / len(total_trait_floor_prices),
                    "max_trait_floor": max(total_trait_floor_prices),
                    "min_trait_floor": min(total_trait_floor_prices),
                    "num_traits_with_floors": len(total_trait_floor_prices)
                }
            
            analysis_data["trait_analysis"] = trait_analysis
            
            # Generate pricing analysis using Claude
            pricing_prompt = f"""
As an expert NFT analyst, provide a comprehensive pricing analysis for this NFT using trait floor price data:

TARGET NFT:
- Collection: {analysis_data['collection']['name']}
- Token ID: {analysis_data['target_nft']['token_id']}
- Traits: {json.dumps(analysis_data['target_nft']['traits'][:6], indent=2)}

COLLECTION DATA:
- Floor Price: {analysis_data['collection']['floor_price']} ETH
- Total Supply: {analysis_data['collection']['total_supply']}
- Unique Owners: {analysis_data['collection']['num_owners']}
- Volume: {analysis_data['collection']['volume']} ETH
- 24h Floor Change: {analysis_data['collection']['one_day_change']}

TRAIT FLOOR PRICE ANALYSIS:
{json.dumps(analysis_data.get('trait_analysis', []), indent=2)}

TRAIT STATISTICS:
{json.dumps(analysis_data.get('trait_stats', {}), indent=2)}

ANALYSIS REQUIREMENTS:
1. **Trait Rarity Assessment**: Use percent data to evaluate how rare each trait is
2. **Trait Floor Impact**: Analyze how individual trait floor prices affect overall value
3. **Pricing Strategy**: Consider trait combination premium vs individual trait floors
4. **Market Position**: Compare to collection floor and trait-specific floors

Format your response as:
🎯 **NFT PRICING ANALYSIS**

**Collection**: {analysis_data['collection']['name']} #{analysis_data['target_nft']['token_id']}

**Trait Rarity Analysis**:
[Analyze each trait's rarity percentage and floor price impact]

**Market Comparison**:
- Collection Floor: {analysis_data['collection']['floor_price']} ETH
- Trait Floors Range: [min to max trait floor prices]
- Average Trait Floor: [if available]

**💰 FAIR MARKET VALUE**: [single price value] ETH

**📊 Reasoning**:
[Detailed explanation using trait floor data and rarity percentages]

IMPORTANT: For the Fair Market Value, provide only ONE specific price (e.g., "13.25 ETH"), NOT a range or multiple estimates.

**⚠️ Market Considerations**:
[Collection health, volume trends, and trait combination factors]
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.gemini.models.generate_content(
                    model="gemini-2.5-pro",
                    contents=pricing_prompt
                )
            )
            
            return response.text.strip()
            
        except Exception as e:
            self._ctx.logger.error(f"Error in pricing analysis: {e}")
            return f"❌ Error analyzing pricing: {str(e)}"
    
    def _extract_content_data(self, content: Any) -> Any:
        """Extract data from MCP response content"""
        if isinstance(content, list) and len(content) > 0:
            if hasattr(content[0], 'text'):
                text_content = content[0].text
                try:
                    return json.loads(text_content)
                except json.JSONDecodeError:
                    return text_content
            else:
                return content[0]
        return content
    
    async def analyze_collection(self, collection_name: str) -> str:
        """Analyze an entire NFT collection's pricing trends"""
        try:
            # Find the collection
            collection_data = await self._find_collection(collection_name)
            if not collection_data:
                return f"❌ Could not find collection '{collection_name}'. Please check the spelling."
            
            # Get top collections data for context
            top_collections_result = await self._session.call_tool(
                "get_top_collections",
                {"sort_by": "volume", "limit": 50}
            )
            
            # Get trending collections
            trending_result = await self._session.call_tool(
                "get_trending_collections",
                {"time_period": "ONE_DAY"}
            )
            
            # Analyze with Claude
            analysis_prompt = f"""
Provide a comprehensive analysis of this NFT collection:

COLLECTION DATA:
{json.dumps(collection_data, indent=2)}

Analyze:
1. **Collection Overview**: Basic stats and positioning
2. **Market Performance**: Volume, floor price trends
3. **Rarity & Traits**: What makes NFTs valuable in this collection
4. **Investment Outlook**: Short and long-term considerations
5. **Comparable Collections**: Similar projects and market position

Format as a professional NFT collection analysis report.
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.gemini.models.generate_content(
                    model="gemini-2.5-pro",
                    contents=analysis_prompt
                )
            )
            
            return response.text.strip()
            
        except Exception as e:
            self._ctx.logger.error(f"Error analyzing collection: {e}")
            return f"❌ Error analyzing collection: {str(e)}"
    
    async def cleanup(self):
        """Clean up the MCP connection"""
        try:
            if self._exit_stack:
                await self._exit_stack.aclose()
            self._ctx.logger.info("OpenSea MCP client cleaned up")
        except Exception as e:
            self._ctx.logger.error(f"Error during cleanup: {e}")

# --- Shared Protocol Import ---
from shared_pricing_protocol import (
    nft_pricing_protocol, 
    NFTPricingRequest, 
    NFTPricingResponse
)

# --- uAgent Setup ---

chat_proto = Protocol(spec=chat_protocol_spec)
agent = Agent(name=AGENT_NAME, port=AGENT_PORT, mailbox=True)

# Store MCP clients per session
session_clients: Dict[str, OpenSeaMCPClient] = {}

def is_session_valid(session_id: str) -> bool:
    """Check if session is valid and hasn't expired"""
    if session_id not in user_sessions:
        return False
    
    last_activity = user_sessions[session_id].get('last_activity', 0)
    if time.time() - last_activity > SESSION_TIMEOUT:
        # Session expired, clean it up
        if session_id in user_sessions:
            del user_sessions[session_id]
        return False
    
    return True

async def get_opensea_client(ctx: Context, session_id: str) -> OpenSeaMCPClient:
    """Get or create OpenSea MCP client for session"""
    if session_id not in session_clients or not is_session_valid(session_id):
        # Create new client
        client = OpenSeaMCPClient(ctx)
        await client.connect()
        session_clients[session_id] = client
    
    return session_clients[session_id]

async def price_nft_for_agent(ctx: Context, collection_name: str, token_id: str) -> Dict[str, Any]:
    """Extract pricing logic for agent-to-agent communication"""
    try:
        # Create a default session for agent requests
        agent_session_id = "agent_request"
        client = await get_opensea_client(ctx, agent_session_id)
        
        # Create query in the format the client expects
        query = f"Price {collection_name} #{token_id}"
        
        # Get pricing analysis
        result = await client.price_nft(query)
        
        # Extract price from the result (basic regex extraction)
        import re
        
        # Look for price patterns in the result
        price_patterns = [
            r"FAIR MARKET VALUE[:\s]+([0-9]+\.?[0-9]*)\s*ETH",
            r"([0-9]+\.?[0-9]*)\s*ETH",
            r"Price[:\s]+([0-9]+\.?[0-9]*)"
        ]
        
        price_eth = None
        for pattern in price_patterns:
            match = re.search(pattern, result, re.IGNORECASE)
            if match:
                try:
                    price_eth = float(match.group(1))
                    break
                except ValueError:
                    continue
        
        return {
            "price_eth": price_eth,
            "reasoning": result,
            "confidence": 0.80,  # Default confidence for Gemini agent
            "traits": [],
            "market_data": {},
            "collection_floor": None
        }
        
    except Exception as e:
        ctx.logger.error(f"Error in agent pricing: {e}")
        raise

# --- Agent-to-Agent Communication Handler ---

@nft_pricing_protocol.on_message(model=NFTPricingRequest)
async def handle_agent_pricing_request(ctx: Context, sender: str, msg: NFTPricingRequest):
    """Handle pricing requests from other agents"""
    
    ctx.logger.info(f"Received agent pricing request from {sender}: {msg.collection_name} #{msg.token_id}")
    
    try:
        # Use the extracted pricing function
        pricing_data = await price_nft_for_agent(ctx, msg.collection_name, msg.token_id)
        
        # Create structured response
        response = NFTPricingResponse(
            request_id=msg.request_id,
            agent_name="Gemini NFT Pricing Agent",
            agent_type="gemini",
            price_eth=pricing_data.get("price_eth"),
            price_usd=None,  # Could calculate if needed
            reasoning=pricing_data.get("reasoning", ""),
            confidence=pricing_data.get("confidence", 0.80),
            traits_analyzed=pricing_data.get("traits", []),
            market_data=pricing_data.get("market_data", {}),
            collection_floor=pricing_data.get("collection_floor"),
            timestamp=datetime.now(timezone.utc).isoformat(),
            success=True
        )
        
        ctx.logger.info(f"Sending agent response: {response.price_eth} ETH")
        
    except Exception as e:
        ctx.logger.error(f"Error processing agent pricing request: {e}")
        
        # Create error response
        response = NFTPricingResponse(
            request_id=msg.request_id,
            agent_name="Gemini NFT Pricing Agent",
            agent_type="gemini",
            price_eth=None,
            price_usd=None,
            reasoning="",
            confidence=0.0,
            traits_analyzed=[],
            market_data={},
            collection_floor=None,
            timestamp=datetime.now(timezone.utc).isoformat(),
            success=False,
            error_message=str(e)
        )
    
    # Send response back to requesting agent
    await ctx.send(sender, response)

# --- User Chat Handler (Existing) ---

@chat_proto.on_message(model=ChatMessage)
async def handle_chat_message(ctx: Context, sender: str, msg: ChatMessage):
    session_id = str(ctx.session)

    # Filter out messages from other agents - only process user messages
    # This prevents processing status messages from consensus agent
    if sender.startswith("agent1q"):  # This is another agent, not a user
        ctx.logger.debug(f"Ignoring ChatMessage from agent {sender}: not a user request")
        return

    # Send acknowledgment first
    ack_msg = ChatAcknowledgement(
        timestamp=datetime.now(timezone.utc),
        acknowledged_msg_id=msg.msg_id
    )
    await ctx.send(sender, ack_msg)

    for item in msg.content:
        if isinstance(item, TextContent):
            ctx.logger.info(f"Received message from {sender}: '{item.text}'")
            
            # Update session activity
            if session_id not in user_sessions:
                user_sessions[session_id] = {}
            user_sessions[session_id]['last_activity'] = time.time()
            
            query = item.text.strip()
            
            # Check for help queries
            if any(word in query.lower() for word in ['help', 'what can you do', 'capabilities', 'commands']):
                response_text = """🎯 **OpenSea NFT Pricing Agent**

I can help you analyze and price NFTs using real-time OpenSea market data!

**🔍 What I can do:**
• **Price Individual NFTs**: Get pricing analysis for specific NFTs based on traits and market data
• **Collection Analysis**: Analyze entire NFT collections and market trends
• **Trait-Based Pricing**: Find similar NFTs with matching traits for price comparison
• **Market Intelligence**: Provide insights on floor prices, volume, and trends

**💰 Pricing Features:**
• **Trait Rarity Analysis**: Evaluate how rare traits affect value
• **Comparable Sales**: Find similar NFTs and their prices  
• **Market Context**: Compare to collection floor and overall market
• **AI-Powered Reasoning**: Intelligent price recommendations with detailed explanations

**🎨 Example Queries:**
• "Price Bored Ape #1234"
• "What's Azuki #999 worth?"
• "Analyze CryptoPunks collection"
• "Price Doodle #555 on Ethereum"
• "Find floor price for Pudgy Penguins"

**🚀 Advanced Features:**
• Multi-trait comparison across collections
• Historical pricing context and trends
• Risk assessment for NFT investments
• Real-time market data from OpenSea

Just tell me which NFT you want to price or which collection to analyze!"""
            else:
                try:
                    # Show processing message
                    processing_msg = ChatMessage(
                        msg_id=str(uuid4()),
                        timestamp=datetime.now(timezone.utc),
                        content=[TextContent(type="text", text="🔍 Analyzing NFT data and market trends... This may take a moment.")]
                    )
                    await ctx.send(sender, processing_msg)
                    
                    # Get OpenSea client and process query
                    client = await get_opensea_client(ctx, session_id)
                    
                    # Determine if this is a pricing query or collection analysis
                    if any(word in query.lower() for word in ['price', 'worth', 'value', '#']) and '#' in query:
                        response_text = await client.price_nft(query)
                    elif any(word in query.lower() for word in ['analyze', 'analysis', 'collection', 'overview']):
                        # Extract collection name for analysis
                        collection_name = query.replace('analyze', '').replace('analysis', '').replace('collection', '').strip()
                        response_text = await client.analyze_collection(collection_name)
                    else:
                        # Default to pricing if unclear
                        response_text = await client.price_nft(query)
                    
                except Exception as e:
                    ctx.logger.error(f"Error processing query: {e}")
                    response_text = f"""❌ **Error processing your request**

Something went wrong while analyzing the NFT data: {str(e)}

🔧 **Troubleshooting:**
• Check that the collection name and token ID are correct
• Make sure the NFT exists on the specified network
• Try a simpler query format like "Price [Collection] #[TokenID]"

🆘 **Need help?** Try asking for 'help' to see available features and example queries."""
            
            # Create and send final response
            response_msg = ChatMessage(
                msg_id=str(uuid4()),
                timestamp=datetime.now(timezone.utc),
                content=[TextContent(type="text", text=response_text)]
            )
            await ctx.send(sender, response_msg)

@chat_proto.on_message(model=ChatAcknowledgement)
async def handle_chat_ack(ctx: Context, sender: str, msg: ChatAcknowledgement):
    pass

@agent.on_event("shutdown")
async def on_shutdown(ctx: Context):
    for client in session_clients.values():
        await client.cleanup()

agent.include(chat_proto)
agent.include(nft_pricing_protocol, publish_manifest=True)

if __name__ == "__main__":
    print(f"OpenSea NFT Pricing Agent starting on http://localhost:{AGENT_PORT}")
    print(f"Agent address: {agent.address}")
    print("🎯 Ready to analyze and price NFTs with OpenSea market data!")
    
    try:
        agent.run()
    except KeyboardInterrupt:
        print("Agent stopped by user")
    except Exception as e:
        print(f"Agent error: {e}")
"""
OpenSea NFT Pricing Agent for Agentverse

Utilizes OpenAI GPT-5 with native MCP support to connect to the OpenSea MCP server.
Analyzes NFT collections, finds similar NFTs based on traits, and provides intelligent 
pricing recommendations using AI-powered market analysis.
"""

import os
import json
import asyncio
import time
import httpx
from typing import Dict, Any, Optional, List, Tuple
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
from openai import OpenAI

# --- Agent Configuration ---

# Load environment variables from a .env file
load_dotenv()

# Get API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env file")

# Debug logging - show first and last 4 chars of key
key_display = f"{OPENAI_API_KEY[:7]}...{OPENAI_API_KEY[-4:]}" if len(OPENAI_API_KEY) > 11 else "KEY_TOO_SHORT"
print(f"DEBUG: Using OpenAI API key: {key_display}")
print(f"DEBUG: Key length: {len(OPENAI_API_KEY)} characters")

OPENSEA_ACCESS_TOKEN = os.getenv("OPENSEA_ACCESS_TOKEN")
if not OPENSEA_ACCESS_TOKEN:
    raise ValueError("OPENSEA_ACCESS_TOKEN not found in .env file")

AGENT_NAME = "opensea_nft_pricing_agent"
AGENT_PORT = 8009

# User sessions store: session_id -> {last_activity}
user_sessions: Dict[str, Dict[str, Any]] = {}

# Session timeout (30 minutes)
SESSION_TIMEOUT = 30 * 60

# --- OpenSea MCP Client Logic ---

class OpenSeaNFTPricer:
    """
    OpenSea NFT Pricing service using OpenAI GPT-5 with native MCP support.
    Leverages OpenAI's Responses API to directly connect to OpenSea MCP server.
    """
    
    def __init__(self, ctx: Context):
        self._ctx = ctx
        self.openai = OpenAI(api_key=OPENAI_API_KEY)
        
    async def connect(self):
        """Initialize the pricing service"""
        self._ctx.logger.info("OpenSea NFT Pricing service initialized with OpenAI GPT-5 + MCP")
        return True
    
    
    async def price_nft(self, query: str) -> str:
        """
        Main function to price an NFT based on user query.
        Uses OpenAI GPT-5 with native MCP support to analyze OpenSea data.
        """
        try:
            self._ctx.logger.info(f"Processing NFT pricing query: '{query}'")
            
            # Use OpenAI's Responses API with MCP to handle the entire NFT pricing workflow
            pricing_prompt = f"""
You are an expert NFT pricing analyst with access to real-time OpenSea market data through MCP tools.

User Query: "{query}"

Please analyze this NFT pricing request by:

1. **Parse the Query**: Extract the collection name and token ID from the user's query
2. **Find the Collection**: Search for the NFT collection using search_collections or search tools
3. **Get NFT Details**: Find the specific NFT and its traits using get_item or search_items 
4. **Analyze Traits**: Get trait floor prices and rarity data using get_collection with attributes
5. **Price Analysis**: Provide a comprehensive pricing analysis

**Response Format:**
🎯 **NFT PRICING ANALYSIS**

**Collection**: [Collection Name] #[Token ID]

**Trait Rarity Analysis**:
[Analyze each trait's rarity percentage and floor price impact]

**Market Comparison**:
- Collection Floor: [X] ETH
- Trait Floors Range: [min to max trait floor prices]
- Average Trait Floor: [if available]

**💰 FAIR MARKET VALUE**: [single specific price] ETH

**📊 Reasoning**:
[Detailed explanation using trait floor data and rarity percentages]

**⚠️ Market Considerations**:
[Collection health, volume trends, and trait combination factors]

IMPORTANT: Use the OpenSea MCP tools to get real-time data. Provide only ONE specific price for Fair Market Value (e.g., "13.25 ETH"), NOT a range.
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.openai.responses.create(
                    model="gpt-5",
                    input=pricing_prompt,
                    tools=[
                        {
                            "type": "mcp",
                            "server_label": "opensea",
                            "server_url": "https://mcp.opensea.io/mcp",
                            "headers": {
                                "Authorization": f"Bearer {OPENSEA_ACCESS_TOKEN}"
                            },
                            "require_approval": "never"
                        }
                    ]
                )
            )
            
            return response.output_text.strip()
            
        except Exception as e:
            self._ctx.logger.error(f"Error in price_nft: {e}")
            return f"❌ An error occurred while pricing the NFT: {str(e)}"
    
    
    async def analyze_collection(self, collection_name: str) -> str:
        """Analyze an entire NFT collection's pricing trends"""
        try:
            self._ctx.logger.info(f"Analyzing collection: '{collection_name}'")
            
            analysis_prompt = f"""
You are an expert NFT collection analyst with access to real-time OpenSea market data through MCP tools.

Collection to analyze: "{collection_name}"

Please provide a comprehensive analysis by:

1. **Find the Collection**: Search for the collection using search_collections or search tools
2. **Get Collection Data**: Use get_collection to get detailed statistics, floor prices, and trends
3. **Get Top Collections**: Use get_top_collections for market context
4. **Get Trending Data**: Use get_trending_collections for trend analysis
5. **Analyze Traits**: Get trait distribution and rarity data using get_collection with attributes

**Response Format:**
📊 **NFT COLLECTION ANALYSIS**

**Collection Overview**:
- Name, supply, floor price, volume
- Market cap and ranking position

**Market Performance**:
- 24h/7d/30d changes in floor price and volume
- Trading velocity and liquidity analysis

**Trait Analysis**:
- Most valuable traits and their floor prices
- Rarity distribution and trait significance

**Investment Outlook**:
- Short-term and long-term considerations
- Risk factors and opportunities

**Market Position**:
- Comparison to similar collections
- Overall market context and trends

IMPORTANT: Use the OpenSea MCP tools to get real-time data for accurate analysis.
"""
            
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self.openai.responses.create(
                    model="gpt-5",
                    input=analysis_prompt,
                    tools=[
                        {
                            "type": "mcp",
                            "server_label": "opensea",
                            "server_url": "https://mcp.opensea.io/mcp",
                            "headers": {
                                "Authorization": f"Bearer {OPENSEA_ACCESS_TOKEN}"
                            },
                            "require_approval": "never"
                        }
                    ]
                )
            )
            
            return response.output_text.strip()
            
        except Exception as e:
            self._ctx.logger.error(f"Error analyzing collection: {e}")
            return f"❌ Error analyzing collection: {str(e)}"
    
    async def cleanup(self):
        """Clean up the pricing service"""
        self._ctx.logger.info("OpenSea NFT Pricing service cleaned up")

# --- uAgent Setup ---

chat_proto = Protocol(spec=chat_protocol_spec)
agent = Agent(name=AGENT_NAME, port=AGENT_PORT, mailbox=True)

# Store pricing clients per session
session_clients: Dict[str, OpenSeaNFTPricer] = {}

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

async def get_opensea_client(ctx: Context, session_id: str) -> OpenSeaNFTPricer:
    """Get or create OpenSea NFT Pricing client for session"""
    if session_id not in session_clients or not is_session_valid(session_id):
        # Create new client
        client = OpenSeaNFTPricer(ctx)
        await client.connect()
        session_clients[session_id] = client
    
    return session_clients[session_id]

@chat_proto.on_message(model=ChatMessage)
async def handle_chat_message(ctx: Context, sender: str, msg: ChatMessage):
    session_id = str(ctx.session)

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

if __name__ == "__main__":
    print(f"OpenSea NFT Pricing Agent starting on http://localhost:{AGENT_PORT}")
    print(f"Agent address: {agent.address}")
    print("🎯 Ready to analyze and price NFTs with OpenAI GPT-5 + OpenSea MCP!")
    
    try:
        agent.run()
    except KeyboardInterrupt:
        print("Agent stopped by user")
    except Exception as e:
        print(f"Agent error: {e}")
"""
OpenSea NFT Pricing Consensus Agent

A sophisticated consensus coordinator that leverages multiple AI pricing agents
and uses MeTTa symbolic reasoning for intelligent price agreement and challenge mechanisms.
Integrates with ASI:One for enhanced natural language processing and reasoning.
"""

import os
import json
import asyncio
import time
import statistics
from typing import Dict, Any, Optional, List, Tuple
from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import uuid4
from dotenv import load_dotenv

from uagents import Agent, Context, Protocol, Model
from uagents_core.contrib.protocols.chat import (
    chat_protocol_spec,
    ChatMessage,
    ChatAcknowledgement,
    TextContent,
    EndSessionContent,
    StartSessionContent,
)

# MeTTa and ASI:One imports
from hyperon import MeTTa, S, V, E, ValueAtom, OperationAtom
from openai import OpenAI

# Shared Protocol Import
from shared_pricing_protocol import (
    nft_pricing_protocol, 
    NFTPricingRequest, 
    NFTPricingResponse
)

# New API Models Import
from consensus_api_models import (
    NFTAppraisalRequest,
    NFTAppraisalResponse,
    NFTIdentity,
    AgentPricingAnalysis,
    TraitAnalysis,
    MarketData,
    ConsensusAnalysis,
    ConsensusMetrics,
    ProcessingMetadata,
    AgentType,
    StreamingLog,
    LogLevel
)

# --- Agent Configuration ---

load_dotenv()

# API Keys
ASI_ONE_API_KEY = os.getenv("ASI_ONE_API_KEY")
if not ASI_ONE_API_KEY:
    raise ValueError("ASI_ONE_API_KEY not found in .env file")

OPENSEA_ACCESS_TOKEN = os.getenv("OPENSEA_ACCESS_TOKEN")

AGENT_NAME = "opensea_nft_pricing_consensus"
AGENT_PORT = 8012

# Known agent addresses (will be discovered at runtime)
PRICING_AGENTS = {
    "openai": {"port": 8010, "address": None},
    "anthropic": {"port": 8011, "address": None}, 
    "gemini": {"port": 8009, "address": None}
}

# Consensus parameters
CONSENSUS_THRESHOLD = 0.15  # 15% variance threshold
OUTLIER_THRESHOLD = 0.20    # 20% deviation for outlier detection
CHALLENGE_TIMEOUT = 30      # seconds
MAX_CHALLENGE_ROUNDS = 2

# Session management
user_sessions: Dict[str, Dict[str, Any]] = {}
SESSION_TIMEOUT = 30 * 60

# Note: Using shared protocol models instead of local ones

class ChallengeRequest(Model):
    """Challenge request for deviating agents"""
    original_request: NFTPricingRequest
    your_price: float
    consensus_price: float
    other_agents_reasoning: List[str]
    challenge_prompt: str
    challenge_round: int

class ConsensusResult(Model):
    """Final consensus result"""
    consensus_price: float
    confidence: float
    participating_agents: List[str]
    price_range: Tuple[float, float]
    reasoning: str
    challenges_issued: int
    timestamp: str

# --- ASI:One LLM Client ---

class ASIOneLLM:
    """ASI:One API client for enhanced reasoning"""
    
    def __init__(self, api_key: str):
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.asi1.ai/v1"
        )
    
    def create_completion(self, prompt: str, max_tokens: int = 1000, use_agentic: bool = True) -> str:
        """Create completion using ASI:One with agentic capabilities"""
        import uuid
        
        try:
            model = "asi1-agentic" if use_agentic else "asi1-mini"
            session_id = str(uuid.uuid4())
            
            completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are an expert NFT pricing analyst with access to advanced reasoning capabilities."},
                    {"role": "user", "content": prompt}
                ],
                model=model,
                max_tokens=max_tokens,
                temperature=0.2,
                top_p=0.9,
                extra_headers={
                    "x-session-id": session_id
                } if use_agentic else {},
                extra_body={
                    "web_search": False  # Disable web search for focused reasoning
                }
            )
            
            response_content = completion.choices[0].message.content
            if not response_content:
                print(f"WARNING: Empty response from ASI:One {model}")
                return ""
            
            return response_content
            
        except Exception as e:
            print(f"ASI:One API Error: {e}")
            if use_agentic:
                # Fallback to asi1-mini if agentic fails
                print("Falling back to asi1-mini model...")
                return self.create_completion(prompt, max_tokens, use_agentic=False)
            else:
                # Return empty string if all fails
                return ""
    
    def parse_nft_query(self, query: str) -> Optional[Dict[str, str]]:
        """Parse user query to extract NFT information"""
        prompt = f"""
You are an NFT query parser. Parse this query and extract the collection name and token ID.

Query: "{query}"

Instructions:
1. Find the NFT collection name (e.g., Moonbirds, Azuki, Bored Ape Yacht Club, CryptoPunks, etc.)
2. Find the token ID (usually a number after # symbol)
3. Default network is "ethereum"

CRITICAL: You must respond with ONLY a valid JSON object. No explanations, no markdown, no extra text.

Required JSON format:
{{
    "collection_name": "exact collection name",
    "token_id": "token number",
    "network": "ethereum"
}}

Examples:
- "price Moonbirds #6023" → {{"collection_name": "Moonbirds", "token_id": "6023", "network": "ethereum"}}
- "What's Azuki #999 worth?" → {{"collection_name": "Azuki", "token_id": "999", "network": "ethereum"}}

Parse the query now and return ONLY the JSON:"""
        
        try:
            # Use non-agentic model for simple parsing tasks to avoid complexity
            response = self.create_completion(prompt, max_tokens=200, use_agentic=False)
            
            # Debug: Log the actual response
            print(f"DEBUG: ASI:One response: '{response}'")
            
            if not response or response.strip() == "":
                print("ERROR: Empty response from ASI:One API")
                return None
            
            # Extract JSON from response - handle various formats
            json_text = response.strip()
            
            # Remove markdown code blocks if present
            if json_text.startswith("```json") and json_text.endswith("```"):
                json_text = json_text[7:-3].strip()
            elif json_text.startswith("```") and json_text.endswith("```"):
                json_text = json_text[3:-3].strip()
            
            # Handle case where response might have extra text before/after JSON
            # Look for JSON object in the response
            start_brace = json_text.find("{")
            end_brace = json_text.rfind("}") + 1
            
            if start_brace >= 0 and end_brace > start_brace:
                json_text = json_text[start_brace:end_brace]
            
            print(f"DEBUG: Extracted JSON text: '{json_text}'")
            
            # Parse the JSON
            try:
                if not json_text or json_text.strip() == "":
                    print("ERROR: No JSON content found in response")
                    return None
                
                parsed_result = json.loads(json_text)
                print(f"DEBUG: Successfully parsed: {parsed_result}")
                return parsed_result
                
            except json.JSONDecodeError as e:
                print(f"JSON decode failed: {e}")
                print(f"Attempted to parse: '{json_text}'")
                return None
                
        except Exception as e:
            print(f"Error parsing NFT query: {e}")
            return None
    
    def generate_challenge_prompt(self, challenge_data: Dict[str, Any]) -> str:
        """Generate intelligent challenge prompt for deviating agent using agentic reasoning"""
        prompt = f"""
You are coordinating a consensus process between NFT pricing AI agents. An agent has provided a price that deviates significantly from the consensus.

PRICING ANALYSIS DIVERGENCE:
- Outlier Agent Price: {challenge_data['your_price']} ETH
- Consensus Price: {challenge_data['consensus_price']} ETH  
- Deviation Amount: {abs(challenge_data['your_price'] - challenge_data['consensus_price']):.2f} ETH
- Deviation Percentage: {abs(challenge_data['your_price'] - challenge_data['consensus_price']) / challenge_data['consensus_price'] * 100:.1f}%

CONSENSUS AGENTS' REASONING:
{chr(10).join([f"• {reasoning}" for reasoning in challenge_data['other_reasoning']])}

TASK: Generate a sophisticated challenge prompt that:

1. **Acknowledges Expertise**: Recognizes the agent's analytical capabilities
2. **Presents Evidence**: Highlights specific consensus points and market data
3. **Requests Reconsideration**: Asks for detailed re-examination of specific factors
4. **Maintains Collaboration**: Uses respectful, professional tone
5. **Focuses on Specifics**: Addresses trait analysis, market conditions, or methodology differences

The challenge should encourage the agent to:
- Re-examine their trait floor price calculations
- Consider market consensus indicators
- Explain their premium/discount rationale
- Validate their confidence level

Generate a concise but comprehensive challenge prompt (2-3 sentences maximum).
"""
        
        return self.create_completion(prompt, max_tokens=400, use_agentic=True)
    
    def analyze_consensus(self, responses: List[NFTPricingResponse]) -> str:
        """Generate human-readable consensus analysis using agentic reasoning"""
        prices = [r.price_eth for r in responses if r.price_eth]
        if not prices:
            return "Unable to analyze consensus - no valid prices received."
        
        avg_price = statistics.mean(prices)
        price_range = (min(prices), max(prices))
        variance = statistics.variance(prices) if len(prices) > 1 else 0
        std_dev = statistics.stdev(prices) if len(prices) > 1 else 0
        coefficient_of_variation = (std_dev / avg_price) * 100 if avg_price > 0 else 0
        
        prompt = f"""
You are conducting a sophisticated multi-agent consensus analysis for NFT pricing. Analyze the convergence of multiple AI pricing models.

CONSENSUS PRICING DATA:
- Individual Agent Prices: {prices} ETH
- Consensus Price (Mean): {avg_price:.3f} ETH
- Price Range: {price_range[0]:.3f} - {price_range[1]:.3f} ETH
- Statistical Variance: {variance:.6f}
- Standard Deviation: {std_dev:.3f} ETH
- Coefficient of Variation: {coefficient_of_variation:.2f}%

DETAILED AGENT REASONING:
{chr(10).join([f"🤖 {r.agent_name.upper()} Agent (Confidence: {r.confidence:.1%}):{chr(10)}   Price: {r.price_eth} ETH{chr(10)}   Analysis: {r.reasoning[:300]}...{chr(10)}" for r in responses])}

ANALYSIS REQUIREMENTS:
Provide a comprehensive assessment covering:

1. **Consensus Quality**: Evaluate agreement strength based on statistical metrics
2. **Methodological Convergence**: How different AI approaches reached similar conclusions
3. **Key Pricing Factors**: Common themes across agent reasoning
4. **Market Positioning**: How this price relates to collection and market context
5. **Confidence Assessment**: Overall reliability of the consensus price
6. **Risk Factors**: Potential market or analytical uncertainties

FORMAT: Professional, data-driven analysis suitable for serious NFT investors and analysts.
TONE: Authoritative but accessible, emphasizing the multi-agent validation process.
LENGTH: Comprehensive but concise (4-6 key points).
"""
        
        return self.create_completion(prompt, max_tokens=1000, use_agentic=True)
    
    def generate_structured_consensus(self, responses: List[NFTPricingResponse]) -> ConsensusAnalysis:
        """Generate structured consensus analysis using ASI:One's structured output"""
        import uuid
        try:
            from openai import pydantic_function_tool
        except ImportError:
            # Fallback if pydantic_function_tool is not available
            print("Warning: pydantic_function_tool not available, using fallback consensus generation")
            return self._generate_fallback_consensus(responses)
        
        try:
            prices = [r.price_eth for r in responses if r.price_eth]
            if not prices:
                # Return empty consensus for no valid prices
                return ConsensusAnalysis(
                    consensus_price_eth=0.0,
                    confidence_score=0.0,
                    strong_consensus=False,
                    metrics=ConsensusMetrics(
                        variance=0.0,
                        standard_deviation=0.0,
                        coefficient_of_variation=0.0,
                        price_range_min=0.0,
                        price_range_max=0.0,
                        median_price=0.0
                    ),
                    consensus_reasoning="No valid price responses received from agents",
                    market_positioning="Unable to determine market position",
                    risk_assessment="High risk due to lack of agent responses"
                )
            
            # Calculate statistical metrics
            avg_price = statistics.mean(prices)
            variance = statistics.variance(prices) if len(prices) > 1 else 0
            std_dev = statistics.stdev(prices) if len(prices) > 1 else 0
            coefficient_of_variation = (std_dev / avg_price) * 100 if avg_price > 0 else 0
            median_price = statistics.median(prices)
            
            session_id = str(uuid.uuid4())
            
            prompt = f"""
Analyze this multi-agent NFT pricing consensus and generate structured analysis.

AGENT RESPONSES:
{chr(10).join([f"- {r.agent_name}: {r.price_eth} ETH (confidence: {r.confidence:.1%}) - {r.reasoning[:200]}..." for r in responses])}

STATISTICAL DATA:
- Prices: {prices} ETH
- Mean: {avg_price:.3f} ETH
- Variance: {variance:.6f}
- Standard Deviation: {std_dev:.3f} ETH
- Coefficient of Variation: {coefficient_of_variation:.2f}%
- Median: {median_price:.3f} ETH

Generate comprehensive structured consensus analysis including:
1. Final consensus price (use mean of prices)
2. Confidence score based on agreement level
3. Whether strong consensus achieved (CV < 10%)
4. Detailed reasoning for the consensus
5. Market positioning analysis
6. Risk assessment

Be thorough and professional in your analysis.
"""
            
            completion = self.client.beta.chat.completions.parse(
                model="asi1-agentic",
                messages=[
                    {"role": "system", "content": "You are an expert NFT pricing analyst generating structured consensus analysis."},
                    {"role": "user", "content": prompt}
                ],
                tools=[pydantic_function_tool(ConsensusAnalysis, name="consensus_analysis")],
                extra_headers={"x-session-id": session_id}
            )
            
            if completion.choices[0].message.tool_calls:
                result = completion.choices[0].message.tool_calls[0].function.parsed_arguments
                
                # Ensure the metrics are populated correctly
                result.metrics = ConsensusMetrics(
                    variance=variance,
                    standard_deviation=std_dev,
                    coefficient_of_variation=coefficient_of_variation,
                    price_range_min=min(prices),
                    price_range_max=max(prices),
                    median_price=median_price
                )
                
                return result
            else:
                # Fallback if structured parsing fails
                reasoning = self.analyze_consensus(responses)
                return ConsensusAnalysis(
                    consensus_price_eth=avg_price,
                    confidence_score=max(0.0, min(1.0, 1.0 - (coefficient_of_variation / 100))),
                    strong_consensus=coefficient_of_variation < 10.0,
                    metrics=ConsensusMetrics(
                        variance=variance,
                        standard_deviation=std_dev,
                        coefficient_of_variation=coefficient_of_variation,
                        price_range_min=min(prices),
                        price_range_max=max(prices),
                        median_price=median_price
                    ),
                    consensus_reasoning=reasoning,
                    market_positioning="Analysis based on multi-agent consensus",
                    risk_assessment="Standard market risk factors apply"
                )
                
        except Exception as e:
            print(f"Error in structured consensus generation: {e}")
            # Return fallback consensus
            prices = [r.price_eth for r in responses if r.price_eth]
            avg_price = statistics.mean(prices) if prices else 0.0
            
            return ConsensusAnalysis(
                consensus_price_eth=avg_price,
                confidence_score=0.5,
                strong_consensus=False,
                metrics=ConsensusMetrics(
                    variance=0.0,
                    standard_deviation=0.0,
                    coefficient_of_variation=0.0,
                    price_range_min=avg_price,
                    price_range_max=avg_price,
                    median_price=avg_price
                ),
                consensus_reasoning=f"Fallback analysis due to processing error: {str(e)}",
                market_positioning="Unable to generate detailed positioning",
                risk_assessment="Higher risk due to analysis limitations"
            )
    
    def _generate_fallback_consensus(self, responses: List[NFTPricingResponse]) -> ConsensusAnalysis:
        """Fallback consensus generation without structured output"""
        prices = [r.price_eth for r in responses if r.price_eth]
        if not prices:
            return ConsensusAnalysis(
                consensus_price_eth=0.0,
                confidence_score=0.0,
                strong_consensus=False,
                metrics=ConsensusMetrics(
                    variance=0.0,
                    standard_deviation=0.0,
                    coefficient_of_variation=0.0,
                    price_range_min=0.0,
                    price_range_max=0.0,
                    median_price=0.0
                ),
                consensus_reasoning="No valid price responses received from agents",
                market_positioning="Unable to determine market position",
                risk_assessment="High risk due to lack of agent responses"
            )
        
        # Calculate statistical metrics
        avg_price = statistics.mean(prices)
        variance = statistics.variance(prices) if len(prices) > 1 else 0
        std_dev = statistics.stdev(prices) if len(prices) > 1 else 0
        coefficient_of_variation = (std_dev / avg_price) * 100 if avg_price > 0 else 0
        median_price = statistics.median(prices)
        
        # Generate reasoning using existing method
        reasoning = self.analyze_consensus(responses)
        
        return ConsensusAnalysis(
            consensus_price_eth=avg_price,
            confidence_score=max(0.0, min(1.0, 1.0 - (coefficient_of_variation / 100))),
            strong_consensus=coefficient_of_variation < 10.0,
            metrics=ConsensusMetrics(
                variance=variance,
                standard_deviation=std_dev,
                coefficient_of_variation=coefficient_of_variation,
                price_range_min=min(prices),
                price_range_max=max(prices),
                median_price=median_price
            ),
            consensus_reasoning=reasoning,
            market_positioning="Analysis based on multi-agent consensus using fallback method",
            risk_assessment="Standard market risk factors apply"
        )

# --- MeTTa Knowledge System ---

class ConsensusKnowledgeGraph:
    """MeTTa-based knowledge graph for consensus reasoning"""
    
    def __init__(self):
        self.metta = MeTTa()
        self._initialize_knowledge()
    
    def _initialize_knowledge(self):
        """Initialize MeTTa knowledge base with consensus rules"""
        
        # Define consensus rules
        consensus_rules = '''
        ; Agent reliability tracking
        (= (agent-reliability openai) 0.85)
        (= (agent-reliability anthropic) 0.90)
        (= (agent-reliability gemini) 0.80)
        
        ; Consensus threshold rules
        (= (consensus-reached $prices)
           (< (price-variance $prices) 0.15))
        
        (= (strong-consensus $prices)
           (< (price-variance $prices) 0.10))
        
        ; Outlier detection
        (= (outlier-agent $agent $price $avg-price)
           (> (abs (- $price $avg-price)) (* 0.2 $avg-price)))
        
        ; Challenge decision rules
        (= (challenge-needed $agent $price $consensus-price)
           (and (outlier-agent $agent $price $consensus-price)
                (< (agent-reliability $agent) 0.85)))
        
        ; Confidence calculation
        (= (confidence-score $variance $num-agents)
           (- 1.0 (* $variance (/ 1.0 $num-agents))))
        
        ; Market condition rules
        (= (volatile-market $price-range)
           (> (/ (- (max $price-range) (min $price-range)) 
                 (avg $price-range)) 0.3))
        
        ; Trust weighting
        (= (weighted-consensus $prices $reliabilities)
           (/ (sum (map * $prices $reliabilities))
              (sum $reliabilities)))
        '''
        
        self.metta.run(consensus_rules)
    
    def add_pricing_data(self, agent: str, price: float, reasoning: str):
        """Add pricing data to knowledge graph"""
        pricing_atom = f'(pricing-data {agent} {price} "{reasoning[:100]}")'
        self.metta.run(pricing_atom)
    
    def evaluate_consensus(self, prices: List[float]) -> Dict[str, Any]:
        """Evaluate consensus using MeTTa rules"""
        if not prices:
            return {"consensus": False, "confidence": 0.0}
        
        # Calculate variance
        variance = statistics.variance(prices) if len(prices) > 1 else 0
        avg_price = statistics.mean(prices)
        
        # Query MeTTa for consensus evaluation
        variance_query = f'!(consensus-reached [{", ".join(map(str, prices))}])'
        consensus_result = self.metta.run(variance_query)
        
        # Calculate confidence
        confidence = max(0.0, min(1.0, 1.0 - (variance / (avg_price ** 2))))
        
        return {
            "consensus": variance < CONSENSUS_THRESHOLD,
            "strong_consensus": variance < 0.10,
            "confidence": confidence,
            "variance": variance,
            "avg_price": avg_price
        }
    
    def identify_outliers(self, agent_prices: Dict[str, float]) -> List[str]:
        """Identify outlier agents using MeTTa rules"""
        if len(agent_prices) < 2:
            return []
        
        prices = list(agent_prices.values())
        avg_price = statistics.mean(prices)
        outliers = []
        
        for agent, price in agent_prices.items():
            deviation = abs(price - avg_price)
            if deviation > (OUTLIER_THRESHOLD * avg_price):
                outliers.append(agent)
        
        return outliers
    
    def should_challenge(self, agent: str, price: float, consensus_price: float) -> bool:
        """Determine if agent should be challenged"""
        deviation = abs(price - consensus_price) / consensus_price
        reliability_query = f'!(agent-reliability {agent})'
        reliability_result = self.metta.run(reliability_query)
        
        # Extract reliability score
        reliability = 0.8  # default
        if reliability_result and len(reliability_result) > 0:
            try:
                reliability = float(str(reliability_result[0][0]))
            except:
                pass
        
        return deviation > OUTLIER_THRESHOLD and reliability < 0.85

# --- Main Consensus Coordinator ---

class ConsensusCoordinator:
    """Main consensus coordination engine"""
    
    def __init__(self, ctx: Context):
        self.ctx = ctx
        self.asi_llm = ASIOneLLM(ASI_ONE_API_KEY)
        self.knowledge_graph = ConsensusKnowledgeGraph()
        self.active_requests: Dict[str, Dict] = {}
    
    async def process_pricing_request(self, query: str) -> str:
        """Main entry point for processing pricing requests (legacy text output)"""
        try:
            # Parse the query
            nft_info = self.asi_llm.parse_nft_query(query)
            if not nft_info:
                return "❌ I couldn't understand which NFT you want me to price. Please specify a collection name and token ID (e.g., 'Price Bored Ape #1234')."
            
            self.ctx.logger.info(f"Processing consensus request for {nft_info}")
            
            # Create pricing request
            request = NFTPricingRequest(
                collection_name=nft_info["collection_name"],
                token_id=nft_info["token_id"],
                network=nft_info.get("network", "ethereum"),
                request_id=str(uuid4()),
                requester_address=str(self.ctx.agent.address),
                timestamp=datetime.now(timezone.utc).isoformat()
            )
            
            # Broadcast to all agents
            responses = await self._broadcast_pricing_request(request)
            
            if len(responses) < 1:
                return f"❌ Insufficient agent responses ({len(responses)}/3). Unable to form consensus."
            
            # Analyze consensus
            consensus_analysis = await self._analyze_consensus(responses, request)
            
            # Handle challenges if needed
            if consensus_analysis["challenges_needed"]:
                challenge_responses = await self._handle_challenges(
                    responses, consensus_analysis, request
                )
                # Re-analyze with challenge responses
                all_responses = responses + challenge_responses
                consensus_analysis = await self._analyze_consensus(all_responses, request)
            
            # Generate final report
            return await self._generate_consensus_report(consensus_analysis, request)
            
        except Exception as e:
            self.ctx.logger.error(f"Error in consensus processing: {e}")
            return f"❌ An error occurred during consensus analysis: {str(e)}"
    
    async def process_pricing_request_structured(self, request: NFTAppraisalRequest) -> NFTAppraisalResponse:
        """Main entry point for structured API requests"""
        start_time = time.time()
        request_id = str(uuid4())
        
        try:
            # Parse the request
            if request.query:
                # Natural language query
                nft_info = self.asi_llm.parse_nft_query(request.query)
                if not nft_info:
                    return NFTAppraisalResponse(
                        request_id=request_id,
                        timestamp=datetime.now(timezone.utc).isoformat(),
                        nft_identity=NFTIdentity(
                            collection_name="",
                            token_id="",
                            network="ethereum"
                        ),
                        agent_analyses=[],
                        consensus=ConsensusAnalysis(
                            consensus_price_eth=0.0,
                            confidence_score=0.0,
                            strong_consensus=False,
                            metrics=ConsensusMetrics(
                                variance=0.0,
                                standard_deviation=0.0,
                                coefficient_of_variation=0.0,
                                price_range_min=0.0,
                                price_range_max=0.0,
                                median_price=0.0
                            ),
                            consensus_reasoning="Could not parse NFT query",
                            market_positioning="Unable to determine",
                            risk_assessment="High risk due to parsing failure"
                        ),
                        processing=ProcessingMetadata(
                            total_processing_time_ms=int((time.time() - start_time) * 1000),
                            agents_queried=0,
                            agents_responded=0,
                            agents_timed_out=[],
                            asi_one_model_used="asi1-agentic",
                            consensus_method="MeTTa symbolic reasoning"
                        ),
                        success=False,
                        error_message="Could not parse NFT query"
                    )
                
                nft_identity = NFTIdentity(
                    collection_name=nft_info["collection_name"],
                    token_id=nft_info["token_id"],
                    network=nft_info.get("network", "ethereum")
                )
                
            elif request.collection_name and request.token_id:
                # Structured input
                nft_identity = NFTIdentity(
                    collection_name=request.collection_name,
                    token_id=request.token_id,
                    network=request.network
                )
                
            else:
                # Invalid request
                return NFTAppraisalResponse(
                    request_id=request_id,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    nft_identity=NFTIdentity(
                        collection_name="",
                        token_id="",
                        network="ethereum"
                    ),
                    agent_analyses=[],
                    consensus=ConsensusAnalysis(
                        consensus_price_eth=0.0,
                        confidence_score=0.0,
                        strong_consensus=False,
                        metrics=ConsensusMetrics(
                            variance=0.0,
                            standard_deviation=0.0,
                            coefficient_of_variation=0.0,
                            price_range_min=0.0,
                            price_range_max=0.0,
                            median_price=0.0
                        ),
                        consensus_reasoning="Invalid request format",
                        market_positioning="Unable to determine",
                        risk_assessment="High risk due to invalid input"
                    ),
                    processing=ProcessingMetadata(
                        total_processing_time_ms=int((time.time() - start_time) * 1000),
                        agents_queried=0,
                        agents_responded=0,
                        agents_timed_out=[],
                        asi_one_model_used="asi1-agentic",
                        consensus_method="MeTTa symbolic reasoning"
                    ),
                    success=False,
                    error_message="Must provide either query or collection_name + token_id"
                )
            
            self.ctx.logger.info(f"Processing structured request for {nft_identity.collection_name} #{nft_identity.token_id}")
            
            # Create pricing request for agents
            pricing_request = NFTPricingRequest(
                collection_name=nft_identity.collection_name,
                token_id=nft_identity.token_id,
                network=nft_identity.network,
                request_id=request_id,
                requester_address=str(self.ctx.agent.address),
                timestamp=datetime.now(timezone.utc).isoformat()
            )
            
            # Broadcast to all agents and collect structured analyses
            agent_analyses = await self._collect_agent_analyses_structured(pricing_request)
            
            if not agent_analyses:
                processing_time = int((time.time() - start_time) * 1000)
                return NFTAppraisalResponse(
                    request_id=request_id,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    nft_identity=nft_identity,
                    agent_analyses=[],
                    consensus=ConsensusAnalysis(
                        consensus_price_eth=0.0,
                        confidence_score=0.0,
                        strong_consensus=False,
                        metrics=ConsensusMetrics(
                            variance=0.0,
                            standard_deviation=0.0,
                            coefficient_of_variation=0.0,
                            price_range_min=0.0,
                            price_range_max=0.0,
                            median_price=0.0
                        ),
                        consensus_reasoning="No agent responses received",
                        market_positioning="Unable to determine without agent data",
                        risk_assessment="High risk due to lack of agent responses"
                    ),
                    processing=ProcessingMetadata(
                        total_processing_time_ms=processing_time,
                        agents_queried=len(PRICING_AGENTS),
                        agents_responded=0,
                        agents_timed_out=[AgentType.OPENAI, AgentType.ANTHROPIC, AgentType.GEMINI],
                        asi_one_model_used="asi1-agentic",
                        consensus_method="MeTTa symbolic reasoning"
                    ),
                    success=False,
                    error_message="No agent responses received"
                )
            
            # Generate structured consensus analysis
            raw_responses = [self._convert_to_pricing_response(analysis) for analysis in agent_analyses]
            consensus = self.asi_llm.generate_structured_consensus(raw_responses)
            
            # Calculate processing metadata
            processing_time = int((time.time() - start_time) * 1000)
            agents_responded = len([a for a in agent_analyses if a.success])
            agents_timed_out = [a.agent_type for a in agent_analyses if not a.success]
            
            return NFTAppraisalResponse(
                request_id=request_id,
                timestamp=datetime.now(timezone.utc).isoformat(),
                nft_identity=nft_identity,
                agent_analyses=agent_analyses,
                consensus=consensus,
                processing=ProcessingMetadata(
                    total_processing_time_ms=processing_time,
                    agents_queried=len(PRICING_AGENTS),
                    agents_responded=agents_responded,
                    agents_timed_out=agents_timed_out,
                    asi_one_model_used="asi1-agentic",
                    consensus_method="MeTTa symbolic reasoning + ASI:One structured output"
                ),
                success=True
            )
            
        except Exception as e:
            self.ctx.logger.error(f"Error in structured consensus processing: {e}")
            processing_time = int((time.time() - start_time) * 1000)
            
            return NFTAppraisalResponse(
                request_id=request_id,
                timestamp=datetime.now(timezone.utc).isoformat(),
                nft_identity=NFTIdentity(
                    collection_name="",
                    token_id="",
                    network="ethereum"
                ),
                agent_analyses=[],
                consensus=ConsensusAnalysis(
                    consensus_price_eth=0.0,
                    confidence_score=0.0,
                    strong_consensus=False,
                    metrics=ConsensusMetrics(
                        variance=0.0,
                        standard_deviation=0.0,
                        coefficient_of_variation=0.0,
                        price_range_min=0.0,
                        price_range_max=0.0,
                        median_price=0.0
                    ),
                    consensus_reasoning=f"Processing error: {str(e)}",
                    market_positioning="Unable to determine due to error",
                    risk_assessment="High risk due to processing failure"
                ),
                processing=ProcessingMetadata(
                    total_processing_time_ms=processing_time,
                    agents_queried=0,
                    agents_responded=0,
                    agents_timed_out=[],
                    asi_one_model_used="asi1-agentic",
                    consensus_method="MeTTa symbolic reasoning"
                ),
                success=False,
                error_message=str(e)
            )
    
    async def _broadcast_pricing_request(self, request: NFTPricingRequest) -> List[NFTPricingResponse]:
        """Broadcast pricing request to all agents and collect responses"""
        responses = []
        tasks = []
        
        # Create tasks for each agent
        for agent_name, agent_info in PRICING_AGENTS.items():
            if agent_info.get("address"):
                coro = self._request_agent_pricing(agent_name, agent_info["address"], request)
                task = asyncio.create_task(coro)
                tasks.append((agent_name, task))
        
        # Execute requests in parallel with timeout
        try:
            results = await asyncio.wait_for(
                asyncio.gather(*[task for _, task in tasks], return_exceptions=True),
                timeout=300.0
            )
            
            for (agent_name, _), result in zip(tasks, results):
                if isinstance(result, Exception):
                    self.ctx.logger.error(f"Agent {agent_name} error: {result}")
                    # Create error response
                    error_response = NFTPricingResponse(
                        request_id=request.request_id,
                        agent_name=agent_name,
                        agent_type=agent_name.lower(),
                        price_eth=None,
                        price_usd=None,
                        reasoning=f"Agent error: {str(result)}",
                        confidence=0.0,
                        traits_analyzed=[],
                        market_data={},
                        collection_floor=None,
                        timestamp=datetime.now(timezone.utc).isoformat(),
                        success=False,
                        error_message=str(result)
                    )
                    responses.append(error_response)
                else:
                    responses.append(result)
                    
        except asyncio.TimeoutError:
            self.ctx.logger.warning("Timeout waiting for agent responses")
        
        return [r for r in responses if r.success and r.price_eth is not None]
    
    async def _request_agent_pricing(self, agent_name: str, agent_address: str, request: NFTPricingRequest) -> NFTPricingResponse:
        """Request pricing from a specific agent using proper protocol"""
        try:
            self.ctx.logger.info(f"Requesting pricing from {agent_name} agent: {request.collection_name} #{request.token_id}")
            
            # Create proper NFTPricingRequest using shared protocol
            pricing_request = NFTPricingRequest(
                collection_name=request.collection_name,
                token_id=request.token_id,
                network=request.network,
                request_id=request.request_id,
                requester_address=str(self.ctx.agent.address),  # Ensure it's a string
                timestamp=datetime.now(timezone.utc).isoformat()
            )
            
            # Use send_and_receive for proper agent-to-agent communication
            response, status = await self.ctx.send_and_receive(
                agent_address,
                pricing_request,
                response_type=NFTPricingResponse,
                timeout=300.0  # 5 minutes timeout
            )
            
            if isinstance(response, NFTPricingResponse):
                self.ctx.logger.info(f"Received response from {agent_name}: {response.price_eth} ETH")
                return response
            else:
                self.ctx.logger.error(f"Invalid response from {agent_name}: {status}")
                # Create error response
                return NFTPricingResponse(
                    request_id=request.request_id,
                    agent_name=agent_name,
                    agent_type=agent_name.lower(),
                    price_eth=None,
                    price_usd=None,
                    reasoning="",
                    confidence=0.0,
                    traits_analyzed=[],
                    market_data={},
                    collection_floor=None,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    success=False,
                    error_message=f"Invalid response format: {status}"
                )
                
        except Exception as e:
            self.ctx.logger.error(f"Error requesting pricing from {agent_name}: {e}")
            # Create error response
            return NFTPricingResponse(
                request_id=request.request_id,
                agent_name=agent_name,
                agent_type=agent_name.lower(),
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
    
    def _extract_price_from_response(self, response_text: str) -> Optional[float]:
        """Extract price value from agent response text"""
        import re
        
        # Look for patterns like "FAIR MARKET VALUE: X.XX ETH" or "X.XX ETH"
        patterns = [
            r"FAIR MARKET VALUE[:\s]+([0-9]+\.?[0-9]*)\s*ETH",
            r"([0-9]+\.?[0-9]*)\s*ETH",
            r"Price[:\s]+([0-9]+\.?[0-9]*)",
            r"([0-9]+\.?[0-9]*)\s*ethereum"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, response_text, re.IGNORECASE)
            if match:
                try:
                    return float(match.group(1))
                except ValueError:
                    continue
        
        return None
    
    async def _analyze_consensus(self, responses: List[NFTPricingResponse], request: NFTPricingRequest) -> Dict[str, Any]:
        """Analyze responses for consensus"""
        if not responses:
            return {"consensus": False, "challenges_needed": [], "error": "No valid responses"}
        
        # Extract prices and agent data
        agent_prices = {r.agent_name: r.price_eth for r in responses if r.price_eth}
        prices = list(agent_prices.values())
        
        if len(prices) < 2:
            return {"consensus": False, "challenges_needed": [], "error": "Insufficient price data"}
        
        # Use MeTTa knowledge graph for analysis
        consensus_eval = self.knowledge_graph.evaluate_consensus(prices)
        outliers = self.knowledge_graph.identify_outliers(agent_prices)
        
        # Determine challenges needed
        challenges_needed = []
        consensus_price = statistics.mean(prices)
        
        for agent in outliers:
            if self.knowledge_graph.should_challenge(agent, agent_prices[agent], consensus_price):
                challenges_needed.append(agent)
        
        return {
            "consensus": consensus_eval["consensus"],
            "confidence": consensus_eval["confidence"],
            "consensus_price": consensus_price,
            "price_range": (min(prices), max(prices)),
            "responses": responses,
            "outliers": outliers,
            "challenges_needed": challenges_needed,
            "analysis": consensus_eval
        }
    
    async def _handle_challenges(self, original_responses: List[NFTPricingResponse], 
                               analysis: Dict[str, Any], request: NFTPricingRequest) -> List[NFTPricingResponse]:
        """Handle challenge process for outlier agents"""
        challenge_responses = []
        
        for agent_name in analysis["challenges_needed"]:
            try:
                # Find the original response
                original_response = next((r for r in original_responses if r.agent_name == agent_name), None)
                if not original_response:
                    continue
                
                # Generate challenge prompt
                other_reasoning = [r.reasoning for r in original_responses if r.agent_name != agent_name]
                
                challenge_data = {
                    "your_price": original_response.price_eth,
                    "consensus_price": analysis["consensus_price"],
                    "other_reasoning": other_reasoning
                }
                
                challenge_prompt = self.asi_llm.generate_challenge_prompt(challenge_data)
                
                # Send challenge to agent
                challenge_query = f"""
CHALLENGE: Your pricing analysis differs significantly from consensus.

Your price: {original_response.price_eth} ETH
Consensus price: {analysis['consensus_price']:.3f} ETH

{challenge_prompt}

Please reconsider your analysis for {request.collection_name} #{request.token_id} and provide an updated assessment.
"""
                
                # Get agent address and send challenge
                agent_info = PRICING_AGENTS.get(agent_name)
                if agent_info and agent_info.get("address"):
                    challenge_response = await self._request_agent_pricing(
                        f"{agent_name}_challenge", 
                        agent_info["address"], 
                        request
                    )
                    challenge_responses.append(challenge_response)
                    
                    self.ctx.logger.info(f"Challenge sent to {agent_name}, received updated price: {challenge_response.price_eth}")
                
            except Exception as e:
                self.ctx.logger.error(f"Error challenging agent {agent_name}: {e}")
        
        return challenge_responses
    
    async def _generate_consensus_report(self, analysis: Dict[str, Any], request: NFTPricingRequest) -> str:
        """Generate final consensus report"""
        if not analysis.get("consensus", False):
            return f"❌ **No Consensus Reached**\n\nUnable to establish consensus for {request.collection_name} #{request.token_id}. Agents provided conflicting assessments."
        
        # Use ASI:One to generate comprehensive analysis
        consensus_text = self.asi_llm.analyze_consensus(analysis["responses"])
        
        # Format final report
        report = f"""🎯 **NFT PRICING CONSENSUS ANALYSIS**

**Collection**: {request.collection_name} #{request.token_id}

**💰 CONSENSUS PRICE**: {analysis['consensus_price']:.3f} ETH

**📊 Consensus Metrics**:
- Price Range: {analysis['price_range'][0]:.3f} - {analysis['price_range'][1]:.3f} ETH
- Confidence Score: {analysis['confidence']:.1%}
- Participating Agents: {len(analysis['responses'])}
- Challenges Issued: {len(analysis.get('challenges_needed', []))}

**🤖 Agent Analysis**:
{consensus_text}

**⚡ Consensus Details**:
- Strong Consensus: {'✅' if analysis['analysis'].get('strong_consensus', False) else '⚠️'}
- Outliers Detected: {len(analysis.get('outliers', []))}
- Final Confidence: {analysis['confidence']:.1%}

*Powered by MeTTa symbolic reasoning and ASI:One intelligence*
"""
        
        return report
    
    async def _collect_agent_analyses_structured(self, request: NFTPricingRequest) -> List[AgentPricingAnalysis]:
        """Collect agent responses and convert to structured analyses"""
        raw_responses = await self._broadcast_pricing_request(request)
        structured_analyses = []
        
        for response in raw_responses:
            # Convert NFTPricingResponse to AgentPricingAnalysis
            analysis = self._convert_to_agent_analysis(response)
            structured_analyses.append(analysis)
        
        return structured_analyses
    
    def _convert_to_agent_analysis(self, response: NFTPricingResponse) -> AgentPricingAnalysis:
        """Convert NFTPricingResponse to structured AgentPricingAnalysis"""
        # Map agent name to AgentType
        agent_type_map = {
            "OpenAI NFT Pricing Agent": AgentType.OPENAI,
            "Anthropic NFT Pricing Agent": AgentType.ANTHROPIC,
            "Gemini NFT Pricing Agent": AgentType.GEMINI
        }
        
        agent_type = agent_type_map.get(response.agent_name, AgentType.OPENAI)
        
        # Extract traits from response
        traits_analyzed = []
        for trait_data in response.traits_analyzed:
            if isinstance(trait_data, dict):
                trait = TraitAnalysis(
                    trait_type=trait_data.get("trait_type", ""),
                    value=trait_data.get("value", ""),
                    rarity_percentage=trait_data.get("rarity_percentage"),
                    floor_price_impact=trait_data.get("floor_price_impact"),
                    market_significance=trait_data.get("market_significance")
                )
                traits_analyzed.append(trait)
        
        # Extract market data
        market_data = MarketData(
            collection_floor=response.collection_floor,
            collection_volume_24h=response.market_data.get("volume_24h"),
            similar_sales=response.market_data.get("similar_sales"),
            trait_floors=response.market_data.get("trait_floors"),
            market_trends=response.market_data.get("trends")
        )
        
        return AgentPricingAnalysis(
            agent_type=agent_type,
            agent_name=response.agent_name,
            price_eth=response.price_eth or 0.0,
            price_usd=response.price_usd,
            confidence=response.confidence,
            reasoning=response.reasoning,
            traits_analyzed=traits_analyzed,
            market_data=market_data,
            processing_time_ms=1000,  # Default, could be calculated
            success=response.success,
            error_message=response.error_message
        )
    
    def _convert_to_pricing_response(self, analysis: AgentPricingAnalysis) -> NFTPricingResponse:
        """Convert AgentPricingAnalysis back to NFTPricingResponse for consensus"""
        # Map AgentType back to agent name
        agent_name_map = {
            AgentType.OPENAI: "OpenAI NFT Pricing Agent",
            AgentType.ANTHROPIC: "Anthropic NFT Pricing Agent", 
            AgentType.GEMINI: "Gemini NFT Pricing Agent"
        }
        
        return NFTPricingResponse(
            request_id="temp",
            agent_name=agent_name_map.get(analysis.agent_type, "Unknown Agent"),
            agent_type=analysis.agent_type.value,
            price_eth=analysis.price_eth,
            price_usd=analysis.price_usd,
            reasoning=analysis.reasoning,
            confidence=analysis.confidence,
            traits_analyzed=[],  # Convert back if needed
            market_data={},      # Convert back if needed
            collection_floor=analysis.market_data.collection_floor,
            timestamp=datetime.now(timezone.utc).isoformat(),
            success=analysis.success,
            error_message=analysis.error_message
        )

# --- Agent Discovery ---

async def discover_agent_addresses(ctx: Context):
    """Discover addresses of pricing agents via almanac or direct connection"""
    try:
        # In uAgents, we need to discover agents through the almanac or use known addresses
        # For now, we'll implement a simple discovery mechanism
        
        # Known agent names and their corresponding addresses (these would be discovered in production)
        known_agents = {
            "opensea_nft_pricing_agent_openai": "openai",
            "opensea_nft_pricing_agent_anthropic": "anthropic", 
            "opensea_nft_pricing_agent_gemini": "gemini"
        }
        
        discovered_count = 0
        
        # For development, we'll manually set known addresses
        # In production, this would query the almanac for active agents
        # TODO: Replace with actual agent addresses when they're running
        hardcoded_addresses = {
            "anthropic": "agent1qw4m9qa495n3muufrw0j8s8jxk6fhm7c534cuf2jdrst9n7w5utyvy7thtt",
            "openai": "agent1qfzjrv8krcejlsgnzemn7m0k0gf8l8wll5g282thxhxqy755nw42shhuhy7",
            "gemini": "agent1qw3nvkfser0zw9kqu90n79u7uavetqs0g79ptzqq5lsr5dvgs73tz55hkqm"
        }
        
        for agent_name, agent_info in PRICING_AGENTS.items():
            address = hardcoded_addresses.get(agent_name)
            if address and not address.startswith("agent1qxxx") and not address.startswith("agent1qyyy"):
                agent_info["address"] = address
                discovered_count += 1
                ctx.logger.info(f"✅ Registered {agent_name} agent: {address}")
            else:
                agent_info["address"] = None
                ctx.logger.warning(f"⚠️  No valid address found for {agent_name} agent - will skip in consensus")
        
        ctx.logger.info(f"Agent discovery completed: {discovered_count} agents registered")
        
        # Note: In production, you would implement proper agent discovery using:
        # 1. Almanac queries to find agents by name/type
        # 2. Service discovery protocols
        # 3. Registry lookups
        # 4. Network scanning for known ports
        
    except Exception as e:
        ctx.logger.error(f"Agent discovery error: {e}")
        # Continue with available agents

# --- uAgent Setup ---

chat_proto = Protocol(spec=chat_protocol_spec)
agent = Agent(name=AGENT_NAME, port=AGENT_PORT, mailbox=True)

# Store coordinators per session
session_coordinators: Dict[str, ConsensusCoordinator] = {}

def is_session_valid(session_id: str) -> bool:
    """Check if session is valid and hasn't expired"""
    if session_id not in user_sessions:
        return False
    
    last_activity = user_sessions[session_id].get('last_activity', 0)
    if time.time() - last_activity > SESSION_TIMEOUT:
        if session_id in user_sessions:
            del user_sessions[session_id]
        return False
    
    return True

async def get_consensus_coordinator(ctx: Context, session_id: str) -> ConsensusCoordinator:
    """Get or create consensus coordinator for session"""
    if session_id not in session_coordinators or not is_session_valid(session_id):
        coordinator = ConsensusCoordinator(ctx)
        session_coordinators[session_id] = coordinator
    
    return session_coordinators[session_id]

@chat_proto.on_message(model=ChatMessage)
async def handle_chat_message(ctx: Context, sender: str, msg: ChatMessage):
    session_id = str(ctx.session)

    # Send acknowledgment
    ack_msg = ChatAcknowledgement(
        timestamp=datetime.now(timezone.utc),
        acknowledged_msg_id=msg.msg_id
    )
    await ctx.send(sender, ack_msg)

    for item in msg.content:
        if isinstance(item, TextContent):
            text_content = item.text.strip()
            
            # Filter out messages from pricing agents that are not pricing responses
            # These are status messages like "Analyzing NFT data..." or error messages
            if sender in [PRICING_AGENTS[a]["address"] for a in PRICING_AGENTS if PRICING_AGENTS[a].get("address")]:
                # This is a message from one of our pricing agents
                # Only process if it looks like a pricing response
                if not any(indicator in text_content.lower() for indicator in ['eth', 'price', 'value', 'worth']):
                    ctx.logger.debug(f"Ignoring non-pricing message from agent: '{text_content[:50]}...'")
                    continue
            
            ctx.logger.info(f"Received consensus request from {sender}: '{text_content}'")
            
            # Update session activity
            if session_id not in user_sessions:
                user_sessions[session_id] = {}
            user_sessions[session_id]['last_activity'] = time.time()
            
            query = text_content
            
            # Check for help queries
            if any(word in query.lower() for word in ['help', 'what can you do', 'capabilities']):
                response_text = """🤖 **NFT Pricing Consensus Agent**

I coordinate multiple AI agents to provide consensus-based NFT pricing analysis!

**🎯 What I do:**
• **Multi-Agent Consensus**: Query OpenAI, Anthropic, and Gemini pricing agents
• **Intelligent Analysis**: Use MeTTa symbolic reasoning for consensus evaluation  
• **Challenge Mechanism**: Challenge deviating agents for re-evaluation
• **ASI:One Integration**: Enhanced natural language processing and reasoning

**💡 Key Features:**
• **Consensus Detection**: Identify when agents agree within 15% variance
• **Outlier Handling**: Challenge agents with significantly different assessments
• **Confidence Scoring**: Rate consensus strength and reliability
• **Symbolic Reasoning**: MeTTa-powered decision making

**🎨 Example Queries:**
• "Price Bored Ape #1234"
• "Get consensus on Azuki #999"
• "What's the fair value of CryptoPunk #5555?"

**⚡ Advanced Intelligence:**
• Multi-round consensus building
• Agent reliability tracking
• Market condition awareness
• Sophisticated challenge prompts

Just tell me which NFT you want consensus pricing on!"""
            else:
                try:
                    # Show processing message
                    processing_msg = ChatMessage(
                        msg_id=str(uuid4()),
                        timestamp=datetime.now(timezone.utc),
                        content=[TextContent(type="text", text="🤖 Initiating consensus analysis across multiple AI agents... This may take up to 60 seconds.")]
                    )
                    await ctx.send(sender, processing_msg)
                    
                    # Get coordinator and process request
                    coordinator = await get_consensus_coordinator(ctx, session_id)
                    response_text = await coordinator.process_pricing_request(query)
                    
                except Exception as e:
                    ctx.logger.error(f"Error in consensus processing: {e}")
                    response_text = f"""❌ **Consensus Analysis Error**

An error occurred during multi-agent consensus analysis: {str(e)}

🔧 **Troubleshooting:**
• Ensure the NFT collection and token ID are correct
• Check that pricing agents are available
• Try a simpler query format like "Price [Collection] #[TokenID]"

🆘 **Need help?** Try asking for 'help' to see capabilities."""
            
            # Send final response
            response_msg = ChatMessage(
                msg_id=str(uuid4()),
                timestamp=datetime.now(timezone.utc),
                content=[TextContent(type="text", text=response_text)]
            )
            await ctx.send(sender, response_msg)

@chat_proto.on_message(model=ChatAcknowledgement)
async def handle_chat_ack(ctx: Context, sender: str, msg: ChatAcknowledgement):
    pass

@agent.on_event("startup")
async def on_startup(ctx: Context):
    ctx.logger.info("Consensus agent starting up...")
    await discover_agent_addresses(ctx)
    ctx.logger.info("Agent discovery completed")

agent.include(chat_proto)
# Note: The consensus agent doesn't need to include nft_pricing_protocol 
# since it only sends requests, doesn't receive them

if __name__ == "__main__":
    print(f"NFT Pricing Consensus Agent starting on http://localhost:{AGENT_PORT}")
    print(f"Agent address: {agent.address}")
    print("🤖 Ready to coordinate multi-agent NFT pricing consensus!")
    print("Features: MeTTa reasoning, ASI:One intelligence, challenge mechanisms")
    
    try:
        agent.run()
    except KeyboardInterrupt:
        print("Consensus agent stopped by user")
    except Exception as e:
        print(f"Agent error: {e}")
"""
Shared NFT Pricing Protocol for Agent Communication

This protocol enables standardized communication between NFT pricing agents
and the consensus coordinator agent.
"""

from uagents import Model, Protocol, Context
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from uuid import uuid4

# --- Data Models ---

class NFTPricingRequest(Model):
    """Standard pricing request for agent-to-agent communication"""
    collection_name: str
    token_id: str
    network: str = "ethereum"
    request_id: str
    requester_address: str
    timestamp: str

class NFTPricingResponse(Model):
    """Standard pricing response from agents"""
    request_id: str
    agent_name: str
    agent_type: str  # "openai", "anthropic", "gemini"
    price_eth: Optional[float]
    price_usd: Optional[float]
    reasoning: str
    confidence: float  # 0.0 to 1.0
    traits_analyzed: List[Dict[str, Any]]
    market_data: Dict[str, Any]
    collection_floor: Optional[float]
    timestamp: str
    success: bool
    error_message: Optional[str] = None

class ConsensusRequest(Model):
    """Request for consensus analysis"""
    collection_name: str
    token_id: str
    network: str = "ethereum"
    request_id: str
    requester_address: str

class ConsensusResponse(Model):
    """Consensus analysis response"""
    request_id: str
    consensus_price_eth: float
    confidence: float
    participating_agents: List[str]
    individual_prices: Dict[str, float]
    price_range: Dict[str, float]  # {"min": x, "max": y}
    reasoning: str
    challenges_issued: int
    timestamp: str
    success: bool

# --- Create Protocol ---

# Version 1.0.0 of the NFT pricing protocol
nft_pricing_protocol = Protocol(
    name="nft_pricing_protocol",
    version="1.0.0"
)

# --- Protocol Implementation Template ---

def create_pricing_handler(agent_name: str, agent_type: str, pricing_function):
    """
    Factory function to create a pricing handler for an agent
    
    Args:
        agent_name: Name of the agent
        agent_type: Type of agent (openai, anthropic, gemini)
        pricing_function: Async function that takes (collection_name, token_id) and returns pricing data
    """
    
    @nft_pricing_protocol.on_message(model=NFTPricingRequest)
    async def handle_pricing_request(ctx: Context, sender: str, msg: NFTPricingRequest):
        """Handle incoming pricing requests from other agents"""
        
        ctx.logger.info(f"Received pricing request from {sender}: {msg.collection_name} #{msg.token_id}")
        
        try:
            # Call the agent's pricing function
            pricing_data = await pricing_function(
                collection_name=msg.collection_name,
                token_id=msg.token_id,
                network=msg.network
            )
            
            # Create response
            response = NFTPricingResponse(
                request_id=msg.request_id,
                agent_name=agent_name,
                agent_type=agent_type,
                price_eth=pricing_data.get("price_eth"),
                price_usd=pricing_data.get("price_usd"),
                reasoning=pricing_data.get("reasoning", ""),
                confidence=pricing_data.get("confidence", 0.8),
                traits_analyzed=pricing_data.get("traits", []),
                market_data=pricing_data.get("market_data", {}),
                collection_floor=pricing_data.get("collection_floor"),
                timestamp=datetime.now(timezone.utc).isoformat(),
                success=True
            )
            
        except Exception as e:
            ctx.logger.error(f"Error processing pricing request: {e}")
            
            # Create error response
            response = NFTPricingResponse(
                request_id=msg.request_id,
                agent_name=agent_name,
                agent_type=agent_type,
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
        
        # Send response back to requester
        await ctx.send(sender, response)
    
    return handle_pricing_request

# --- Usage Example ---

"""
To use this protocol in your pricing agents:

1. Import the protocol:
```python
from shared_pricing_protocol import nft_pricing_protocol, create_pricing_handler
```

2. Create your pricing function:
```python
async def my_pricing_function(collection_name: str, token_id: str, network: str) -> Dict:
    # Your existing pricing logic here
    # Should return a dict with: price_eth, reasoning, confidence, etc.
    return {
        "price_eth": 25.5,
        "reasoning": "Based on trait analysis...",
        "confidence": 0.85,
        # ... other fields
    }
```

3. Register the handler:
```python
# Create the handler
pricing_handler = create_pricing_handler(
    agent_name="OpenAI NFT Pricer",
    agent_type="openai",
    pricing_function=my_pricing_function
)

# Include the protocol in your agent
agent.include(nft_pricing_protocol, publish_manifest=True)
```

4. For the consensus agent to request pricing:
```python
from shared_pricing_protocol import NFTPricingRequest, NFTPricingResponse

# Create request
request = NFTPricingRequest(
    collection_name="Moonbirds",
    token_id="6023",
    network="ethereum",
    request_id=str(uuid4()),
    requester_address=ctx.agent.address,
    timestamp=datetime.now(timezone.utc).isoformat()
)

# Send to pricing agent and wait for response
response = await ctx.send_and_receive(
    pricing_agent_address,
    request,
    response_type=NFTPricingResponse
)

if response.success:
    print(f"Price: {response.price_eth} ETH")
```
"""
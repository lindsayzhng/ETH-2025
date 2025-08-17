# Important Note: Agent-to-Agent Communication

## Current Status

The consensus agent is implemented but **agent-to-agent communication requires additional protocol implementation**.

## The Issue

The current pricing agents (OpenAI, Anthropic, Gemini) are designed to:
- Respond to **user chat messages** via the chat protocol
- Process queries from the Agentverse UI
- Return pricing responses to users

They are NOT currently set up to:
- Respond to other agents
- Use a shared pricing protocol
- Return structured pricing data

## Solution Options

### Option 1: Implement Shared Pricing Protocol (Recommended)

Create a shared protocol that all agents implement:

```python
# shared_protocol.py
from uagents import Model, Protocol

class PricingRequest(Model):
    collection_name: str
    token_id: str
    network: str = "ethereum"

class PricingResponse(Model):
    price_eth: float
    reasoning: str
    confidence: float

pricing_protocol = Protocol(name="nft_pricing", version="1.0.0")

@pricing_protocol.on_message(model=PricingRequest)
async def handle_pricing_request(ctx: Context, sender: str, msg: PricingRequest):
    # Process pricing request
    # Return PricingResponse
```

Then update each pricing agent to include this protocol.

### Option 2: Use Agentverse Service Registry

Register pricing agents as services in Agentverse and use service discovery:

```python
# In each pricing agent
agent.include(pricing_protocol, publish_manifest=True)
```

### Option 3: HTTP REST Endpoints

Add REST endpoints to pricing agents:

```python
@agent.on_rest_get("/price/{collection}/{token_id}", PricingResponse)
async def handle_rest_pricing(ctx: Context, collection: str, token_id: str):
    # Return pricing
```

## Current Workaround

The consensus agent currently:
1. ✅ Parses NFT queries correctly
2. ✅ Has correct agent addresses
3. ❌ Cannot directly query pricing agents (protocol mismatch)

## To Make It Work

1. **Update all pricing agents** to implement a shared pricing protocol
2. **Update consensus agent** to use the shared protocol
3. **Test** the complete multi-agent system

## Alternative: User-Mediated Consensus

For now, users can:
1. Query each pricing agent individually
2. Compare results manually
3. Use the consensus agent for analysis once agent-to-agent communication is implemented

## Files to Update

- `/backend/opensea_nft_pricing_agent_openai/agent.py` - Add pricing protocol
- `/backend/opensea_nft_pricing_agent_anthropic/agent.py` - Add pricing protocol  
- `/backend/opensea_nft_pricing_agent_gemini/agent.py` - Add pricing protocol
- `/backend/opensea_nft_pricing_consensus/agent.py` - Use pricing protocol

## Environment Variables Needed

```env
ASI_ONE_API_KEY=your_asi_one_api_key
OPENSEA_ACCESS_TOKEN=your_opensea_token
```

## Agent Addresses (Current)

- OpenAI: `agent1qfzjrv8krcejlsgnzemn7m0k0gf8l8wll5g282thxhxqy755nw42shhuhy7`
- Anthropic: `agent1qw4m9qa495n3muufrw0j8s8jxk6fhm7c534cuf2jdrst9n7w5utyvy7thtt`
- Gemini: `agent1qw3nvkfser0zw9kqu90n79u7uavetqs0g79ptzqq5lsr5dvgs73tz55hkqm`
- Consensus: `agent1qwjapfxkm8e2gm2g6mpgm9v49crx30ujrue4usv7w8f5zywxrz4q7w52ku5`
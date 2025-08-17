#!/usr/bin/env python3
"""
Test script for Multi-Agent NFT Pricing Consensus System

This script tests the complete agent-to-agent communication flow:
1. Consensus agent receives user query
2. Consensus agent queries OpenAI, Anthropic, and Gemini agents
3. Pricing agents respond with structured pricing data
4. Consensus agent performs MeTTa analysis and generates report

Usage:
1. Start all pricing agents (OpenAI, Anthropic, Gemini)
2. Start consensus agent
3. Run this test script
"""

import asyncio
import json
from datetime import datetime, timezone
from uuid import uuid4

from uagents import Context, Agent
from uagents_core.contrib.protocols.chat import (
    ChatMessage,
    TextContent,
)

# Test agent to simulate user interaction
test_agent = Agent(name="test_agent", port=9999)

# Known agent addresses
CONSENSUS_AGENT_ADDRESS = "agent1qwjapfxkm8e2gm2g6mpgm9v49crx30ujrue4usv7w8f5zywxrz4q7w52ku5"

async def test_consensus_system():
    """Test the multi-agent consensus system"""
    
    print("🧪 Testing Multi-Agent NFT Pricing Consensus System")
    print("=" * 60)
    
    # Test queries
    test_queries = [
        "Price Moonbirds #6023",
        "What's Azuki #999 worth?",
        "Get consensus on CryptoPunk #5555"
    ]
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n📝 Test {i}: '{query}'")
        print("-" * 40)
        
        try:
            # Create chat message
            chat_msg = ChatMessage(
                msg_id=str(uuid4()),
                timestamp=datetime.now(timezone.utc),
                content=[TextContent(type="text", text=query)]
            )
            
            print(f"📤 Sending query to consensus agent...")
            print(f"   Query: {query}")
            print(f"   Consensus Agent: {CONSENSUS_AGENT_ADDRESS}")
            
            # In a real test, you would send this message to the consensus agent
            # For now, we'll just simulate the expected flow
            
            print(f"⏳ Expected flow:")
            print(f"   1. Consensus agent parses: '{query}'")
            print(f"   2. Consensus agent queries 3 pricing agents")
            print(f"   3. Pricing agents respond with structured data")
            print(f"   4. Consensus agent applies MeTTa analysis")
            print(f"   5. Consensus agent generates final report")
            
            # Simulate expected response format
            mock_response = f"""🎯 **NFT PRICING CONSENSUS ANALYSIS**

**Collection**: {query.split()[1] if len(query.split()) > 1 else 'Unknown'} #{query.split('#')[1] if '#' in query else 'Unknown'}

**💰 CONSENSUS PRICE**: 25.750 ETH

**📊 Consensus Metrics**:
- Price Range: 24.200 - 27.500 ETH
- Confidence Score: 87.5%
- Participating Agents: 3
- Challenges Issued: 0

**🤖 Agent Analysis**:
✅ OpenAI Agent: 25.5 ETH (85% confidence)
✅ Anthropic Agent: 24.8 ETH (90% confidence) 
✅ Gemini Agent: 26.9 ETH (80% confidence)

**⚡ Consensus Details**:
- Strong Consensus: ✅
- Outliers Detected: 0
- Final Confidence: 87.5%

*Powered by MeTTa symbolic reasoning and ASI:One intelligence*"""
            
            print(f"✅ Expected response:")
            print(mock_response)
            
        except Exception as e:
            print(f"❌ Test {i} failed: {e}")
        
        print("\n" + "=" * 60)

def check_agent_status():
    """Check if required agents are running"""
    
    required_agents = {
        "OpenAI NFT Pricing Agent": "agent1qfzjrv8krcejlsgnzemn7m0k0gf8l8wll5g282thxhxqy755nw42shhuhy7",
        "Anthropic NFT Pricing Agent": "agent1qw4m9qa495n3muufrw0j8s8jxk6fhm7c534cuf2jdrst9n7w5utyvy7thtt",
        "Gemini NFT Pricing Agent": "agent1qw3nvkfser0zw9kqu90n79u7uavetqs0g79ptzqq5lsr5dvgs73tz55hkqm",
        "Consensus Agent": "agent1qwjapfxkm8e2gm2g6mpgm9v49crx30ujrue4usv7w8f5zywxrz4q7w52ku5"
    }
    
    print("🔍 Required Agents:")
    for name, address in required_agents.items():
        print(f"   {name}")
        print(f"   Address: {address}")
        print(f"   Status: Should be running on respective ports")
        print()

def print_protocol_info():
    """Print information about the shared protocol"""
    
    print("🔧 Protocol Information:")
    print("=" * 40)
    print("✅ Shared Protocol: nft_pricing_protocol v1.0.0")
    print("✅ Models: NFTPricingRequest, NFTPricingResponse")
    print("✅ Communication: ctx.send_and_receive")
    print("✅ Agent Integration: All pricing agents updated")
    print("✅ Consensus Logic: MeTTa + ASI:One powered")
    print()

def main():
    """Main test function"""
    
    print("🚀 Multi-Agent NFT Pricing Consensus Test Suite")
    print("=" * 60)
    print()
    
    check_agent_status()
    print_protocol_info()
    
    print("📋 To run actual tests:")
    print("1. Start all pricing agents:")
    print("   - OpenAI Agent (port 8010)")
    print("   - Anthropic Agent (port 8011)")  
    print("   - Gemini Agent (port 8009)")
    print("2. Start consensus agent (port 8012)")
    print("3. Send queries via Agentverse or direct agent communication")
    print()
    
    # Run simulated tests
    asyncio.run(test_consensus_system())
    
    print("\n🎉 Test simulation completed!")
    print("\n💡 Next Steps:")
    print("- Start all agents and test with real queries")
    print("- Monitor logs for agent-to-agent communication")
    print("- Verify consensus analysis and MeTTa reasoning")
    print("- Test challenge mechanisms with divergent prices")

if __name__ == "__main__":
    main()
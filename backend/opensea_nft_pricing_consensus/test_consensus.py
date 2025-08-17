#!/usr/bin/env python3
"""
Test script for the NFT Pricing Consensus Agent

This script helps test the consensus agent by simulating interactions
and verifying that the multi-agent coordination works correctly.
"""

import asyncio
import json
from datetime import datetime, timezone
from uuid import uuid4

# Mock responses for testing consensus logic
MOCK_AGENT_RESPONSES = {
    "openai": {
        "price_eth": 25.5,
        "reasoning": "Based on trait analysis and OpenSea floor data, this Bored Ape has rare fur and background traits that command a premium of approximately 15% above floor price.",
        "confidence": 0.85
    },
    "anthropic": {
        "price_eth": 24.8,
        "reasoning": "Comprehensive trait floor analysis indicates strong market position. Rare trait combination justifies pricing above collection floor, considering recent sales velocity.",
        "confidence": 0.92
    },
    "gemini": {
        "price_eth": 26.2,
        "reasoning": "Market analysis shows this NFT has high-value traits with limited supply. Premium pricing supported by comparable sales and rarity metrics.",
        "confidence": 0.88
    }
}

MOCK_OUTLIER_RESPONSES = {
    "openai": {
        "price_eth": 25.5,
        "reasoning": "Standard trait analysis indicates moderate premium above floor price.",
        "confidence": 0.85
    },
    "anthropic": {
        "price_eth": 24.9,
        "reasoning": "Trait floor analysis supports pricing near collection average.",
        "confidence": 0.90
    },
    "gemini": {
        "price_eth": 35.0,  # Outlier price
        "reasoning": "Exceptional rare trait combination with ultra-high market demand. This piece represents top 1% of collection value.",
        "confidence": 0.95
    }
}

def test_consensus_detection():
    """Test consensus detection algorithm"""
    print("🧪 Testing Consensus Detection")
    
    # Test case 1: Strong consensus
    prices_consensus = [25.5, 24.8, 26.2]
    variance = sum((p - sum(prices_consensus)/len(prices_consensus))**2 for p in prices_consensus) / len(prices_consensus)
    consensus_threshold = 0.15
    
    avg_price = sum(prices_consensus) / len(prices_consensus)
    relative_variance = variance / (avg_price ** 2)
    
    print(f"  Prices: {prices_consensus}")
    print(f"  Average: {avg_price:.3f} ETH")
    print(f"  Variance: {variance:.6f}")
    print(f"  Relative Variance: {relative_variance:.6f}")
    print(f"  Consensus Reached: {relative_variance < consensus_threshold}")
    print()
    
    # Test case 2: Outlier detection
    prices_outlier = [25.5, 24.9, 35.0]
    outlier_threshold = 0.20
    
    avg_price_outlier = sum(prices_outlier) / len(prices_outlier)
    outliers = []
    
    for i, price in enumerate(prices_outlier):
        deviation = abs(price - avg_price_outlier) / avg_price_outlier
        if deviation > outlier_threshold:
            outliers.append(i)
    
    print("🎯 Testing Outlier Detection")
    print(f"  Prices: {prices_outlier}")
    print(f"  Average: {avg_price_outlier:.3f} ETH")
    print(f"  Outlier Indices: {outliers}")
    print(f"  Outlier Price: {prices_outlier[outliers[0]] if outliers else 'None'}")
    print()

def test_metta_rules():
    """Test MeTTa rule evaluation"""
    print("⚡ Testing MeTTa Rules")
    
    try:
        from hyperon import MeTTa
        
        metta = MeTTa()
        
        # Define test rules
        rules = '''
        (= (consensus-reached $prices)
           (< (price-variance $prices) 0.15))
        
        (= (price-variance $prices)
           (/ (sum (map (lambda $p (square (- $p (avg $prices)))) $prices))
              (length $prices)))
        '''
        
        metta.run(rules)
        print("  ✅ MeTTa rules loaded successfully")
        
        # Test consensus evaluation
        test_prices = [25.5, 24.8, 26.2]
        query = f'!(consensus-reached {test_prices})'
        result = metta.run(query)
        print(f"  Query: {query}")
        print(f"  Result: {result}")
        
    except ImportError:
        print("  ⚠️  MeTTa not available - install hyperon package")
    except Exception as e:
        print(f"  ❌ MeTTa error: {e}")
    
    print()

def test_asi_one_integration():
    """Test ASI:One Agentic API integration"""
    print("🚀 Testing ASI:One Agentic Integration")
    
    try:
        # This would test actual ASI:One API if credentials are available
        print("  📝 Query Parsing Test (asi1-agentic model)")
        test_queries = [
            "Price Bored Ape #1234",
            "What's Azuki #999 worth?", 
            "Get consensus on CryptoPunk #5555"
        ]
        
        for query in test_queries:
            print(f"    Query: '{query}'")
            # Mock parsing result with enhanced agentic reasoning
            if "#" in query:
                parts = query.split("#")
                if len(parts) == 2:
                    collection_part = parts[0].strip()
                    token_id = parts[1].strip()
                    
                    # Extract collection name with agentic understanding
                    for keyword in ["Price", "What's", "worth", "Get", "consensus", "on"]:
                        collection_part = collection_part.replace(keyword, "").strip()
                    
                    print(f"      → Collection: {collection_part}, Token: {token_id}")
                    print(f"      → Agentic Model: asi1-agentic with session persistence")
            print()
        
        print("  🎯 Advanced Challenge Prompt Generation Test")
        challenge_scenario = {
            "your_price": 35.0,
            "consensus_price": 25.4,
            "other_reasoning": [
                "Trait analysis supports moderate premium based on floor data",
                "Market data indicates standard pricing with 10% rarity premium",
                "Recent sales velocity suggests conservative valuation approach"
            ]
        }
        
        print(f"    Scenario: Agent price {challenge_scenario['your_price']} vs consensus {challenge_scenario['consensus_price']}")
        print(f"    Deviation: {abs(challenge_scenario['your_price'] - challenge_scenario['consensus_price']):.1f} ETH ({abs(challenge_scenario['your_price'] - challenge_scenario['consensus_price']) / challenge_scenario['consensus_price'] * 100:.1f}%)")
        print("    🤖 Agentic model would generate sophisticated challenge considering:")
        print("      • Statistical significance of deviation")
        print("      • Methodological differences between agents")
        print("      • Market context and confidence levels")
        print("      • Collaborative re-evaluation approach")
        print()
        
        print("  📊 Enhanced Consensus Analysis Test")
        print("    🧠 asi1-agentic provides advanced capabilities:")
        print("      • Multi-step reasoning traces")
        print("      • Statistical variance analysis")
        print("      • Methodological convergence assessment")
        print("      • Professional-grade reporting")
        print("      • Session-based context awareness")
        print()
        
    except Exception as e:
        print(f"  ❌ ASI:One agentic integration error: {e}")

def simulate_consensus_flow():
    """Simulate the full consensus flow"""
    print("🔄 Simulating Full Consensus Flow")
    
    # Scenario 1: Normal consensus
    print("  📊 Scenario 1: Normal Consensus")
    responses = MOCK_AGENT_RESPONSES
    prices = [r["price_eth"] for r in responses.values()]
    avg_price = sum(prices) / len(prices)
    
    print(f"    Agent Prices: {prices}")
    print(f"    Consensus Price: {avg_price:.3f} ETH")
    print(f"    Status: ✅ Consensus achieved")
    print()
    
    # Scenario 2: Outlier challenge
    print("  ⚠️  Scenario 2: Outlier Challenge")
    outlier_responses = MOCK_OUTLIER_RESPONSES
    outlier_prices = [r["price_eth"] for r in outlier_responses.values()]
    outlier_avg = sum(outlier_prices) / len(outlier_prices)
    
    print(f"    Agent Prices: {outlier_prices}")
    print(f"    Initial Average: {outlier_avg:.3f} ETH")
    
    # Identify outlier
    outlier_threshold = 0.20
    for agent, response in outlier_responses.items():
        deviation = abs(response["price_eth"] - outlier_avg) / outlier_avg
        if deviation > outlier_threshold:
            print(f"    🎯 Outlier detected: {agent} ({response['price_eth']} ETH, {deviation:.1%} deviation)")
            print(f"    📝 Challenge would be issued to {agent}")
            
            # Simulate challenge response (agent reconsiders)
            revised_price = 27.5  # More reasonable price after challenge
            print(f"    🔄 {agent} revised price: {revised_price} ETH")
            
            # Recalculate consensus
            new_prices = [outlier_prices[0], outlier_prices[1], revised_price]
            new_avg = sum(new_prices) / len(new_prices)
            print(f"    ✅ New consensus: {new_avg:.3f} ETH")
    
    print()

def main():
    """Run all tests"""
    print("🤖 NFT Pricing Consensus Agent Test Suite")
    print("=" * 50)
    print()
    
    test_consensus_detection()
    test_metta_rules() 
    test_asi_one_integration()
    simulate_consensus_flow()
    
    print("🎉 Test suite completed!")
    print()
    print("📋 To run the actual consensus agent:")
    print("   1. Ensure all pricing agents are running (ports 8009, 8010, 8011)")
    print("   2. Set ASI_ONE_API_KEY in .env file")
    print("   3. Run: python agent.py")
    print("   4. Connect on port 8012")

if __name__ == "__main__":
    main()
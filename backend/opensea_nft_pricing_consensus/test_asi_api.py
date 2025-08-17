#!/usr/bin/env python3
"""
Test ASI:One API connectivity and response format
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def test_asi_one_api():
    """Test basic ASI:One API functionality"""
    
    api_key = os.getenv("ASI_ONE_API_KEY")
    if not api_key:
        print("❌ ASI_ONE_API_KEY not found in environment")
        return False
    
    print(f"🔑 API Key found: {api_key[:10]}...{api_key[-4:]}")
    
    client = OpenAI(
        api_key=api_key,
        base_url="https://api.asi1.ai/v1"
    )
    
    print("🧪 Testing asi1-mini model...")
    try:
        response = client.chat.completions.create(
            model="asi1-mini",
            messages=[
                {"role": "user", "content": "Hello, can you respond with just the word 'SUCCESS'?"}
            ],
            max_tokens=50,
            temperature=0.1
        )
        
        content = response.choices[0].message.content
        print(f"✅ asi1-mini response: '{content}'")
        
        if content and content.strip():
            print("✅ asi1-mini working correctly")
        else:
            print("❌ asi1-mini returned empty content")
            return False
            
    except Exception as e:
        print(f"❌ asi1-mini error: {e}")
        return False
    
    print("\n🧪 Testing asi1-agentic model...")
    try:
        import uuid
        session_id = str(uuid.uuid4())
        
        response = client.chat.completions.create(
            model="asi1-agentic",
            messages=[
                {"role": "user", "content": "Respond with only: {'test': 'success'}"}
            ],
            max_tokens=50,
            temperature=0.1,
            extra_headers={
                "x-session-id": session_id
            }
        )
        
        content = response.choices[0].message.content
        print(f"✅ asi1-agentic response: '{content}'")
        
        if content and content.strip():
            print("✅ asi1-agentic working correctly")
        else:
            print("❌ asi1-agentic returned empty content")
            return False
            
    except Exception as e:
        print(f"❌ asi1-agentic error: {e}")
        return False
    
    print("\n🧪 Testing JSON parsing task...")
    try:
        test_prompt = '''Parse this NFT query: "price Moonbirds #6023"

Return ONLY valid JSON:
{
    "collection_name": "collection name",
    "token_id": "token number", 
    "network": "ethereum"
}'''
        
        response = client.chat.completions.create(
            model="asi1-mini",
            messages=[
                {"role": "user", "content": test_prompt}
            ],
            max_tokens=200,
            temperature=0.1
        )
        
        content = response.choices[0].message.content
        print(f"📝 JSON parsing response: '{content}'")
        
        # Try to parse as JSON
        import json
        try:
            parsed = json.loads(content.strip())
            print(f"✅ Successfully parsed JSON: {parsed}")
            return True
        except json.JSONDecodeError:
            print(f"❌ Response is not valid JSON")
            return False
            
    except Exception as e:
        print(f"❌ JSON parsing test error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 ASI:One API Test Suite")
    print("=" * 40)
    
    success = test_asi_one_api()
    
    if success:
        print("\n🎉 All tests passed! ASI:One API is working correctly.")
    else:
        print("\n❌ Some tests failed. Check API key and connectivity.")
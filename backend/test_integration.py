#!/usr/bin/env python3
"""
Integration Test Script for NFT Appraisal System

Tests the complete flow from API gateway to consensus agent
"""

import asyncio
import json
import time
import requests
import websockets
from uuid import uuid4

API_BASE_URL = "http://localhost:8000"
WS_BASE_URL = "ws://localhost:8000"

async def test_websocket_streaming(session_id: str):
    """Test WebSocket streaming functionality"""
    print(f"🔌 Testing WebSocket connection for session: {session_id}")
    
    ws_url = f"{WS_BASE_URL}/api/v1/stream/{session_id}"
    
    try:
        async with websockets.connect(ws_url) as websocket:
            print("✅ WebSocket connected successfully")
            
            # Wait for welcome message
            message = await websocket.recv()
            data = json.loads(message)
            print(f"📥 Received: {data.get('type', 'unknown')} - {data.get('message', '')}")
            
            # Listen for streaming messages
            timeout_count = 0
            max_timeout = 30  # 30 seconds
            
            while timeout_count < max_timeout:
                try:
                    message = await asyncio.wait_for(websocket.recv(), timeout=1.0)
                    data = json.loads(message)
                    
                    msg_type = data.get('type')
                    if msg_type == 'log':
                        agent = data.get('log', {}).get('agent', 'unknown')
                        log_msg = data.get('log', {}).get('message', '')
                        print(f"📝 [{agent.upper()}] {log_msg}")
                    elif msg_type == 'progress':
                        progress = data.get('progressPercentage', 0)
                        stage = data.get('stage', '')
                        print(f"📊 Progress: {progress:.1f}% - {stage}")
                    elif msg_type == 'agent_result':
                        agent = data.get('agentAnalysis', {}).get('agentType', 'unknown')
                        price = data.get('agentAnalysis', {}).get('priceEth', 0)
                        print(f"🤖 [{agent.upper()}] Analysis complete: {price} ETH")
                    elif msg_type == 'final_result':
                        result = data.get('result', {})
                        consensus_price = result.get('consensus', {}).get('consensusPriceEth', 0)
                        print(f"🎯 Final consensus: {consensus_price} ETH")
                        print("✅ Appraisal completed successfully!")
                        break
                    elif msg_type == 'error':
                        error_msg = data.get('errorMessage', 'Unknown error')
                        print(f"❌ Error: {error_msg}")
                        break
                    elif msg_type == 'ping':
                        # Keep-alive ping, continue
                        pass
                    
                    timeout_count = 0  # Reset timeout on any message
                    
                except asyncio.TimeoutError:
                    timeout_count += 1
                    if timeout_count % 10 == 0:
                        print(f"⏳ Waiting for updates... ({timeout_count}s)")
            
            if timeout_count >= max_timeout:
                print("⏰ WebSocket test timed out")
                
    except Exception as e:
        print(f"❌ WebSocket error: {e}")

def test_api_endpoints():
    """Test basic API endpoints"""
    print("🧪 Testing API endpoints...")
    
    # Test health check
    try:
        response = requests.get(f"{API_BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check: {data.get('status', 'unknown')}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    return True

async def test_full_appraisal():
    """Test complete appraisal flow"""
    print("🎯 Testing full appraisal flow...")
    
    # Test data
    request_data = {
        "query": "Price Pudgy Penguins #3532",
        "network": "ethereum",
        "includeStreamingLogs": True,
        "maxProcessingTimeMinutes": 5
    }
    
    try:
        # Start appraisal
        print("📤 Starting appraisal request...")
        response = requests.post(
            f"{API_BASE_URL}/api/v1/appraise",
            json=request_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"❌ Appraisal request failed: {response.status_code}")
            print(response.text)
            return False
        
        data = response.json()
        session_id = data.get("sessionId")
        
        if not session_id:
            print("❌ No session ID received")
            return False
        
        print(f"✅ Appraisal started with session ID: {session_id}")
        print(f"🔗 WebSocket URL: {data.get('websocketUrl', 'N/A')}")
        
        # Test WebSocket streaming
        await test_websocket_streaming(session_id)
        
        # Test status endpoint
        print("📊 Testing status endpoint...")
        status_response = requests.get(f"{API_BASE_URL}/api/v1/status/{session_id}")
        if status_response.status_code == 200:
            status_data = status_response.json()
            print(f"✅ Status: {status_data.get('status', 'unknown')}")
        else:
            print(f"⚠️ Status check failed: {status_response.status_code}")
        
        return True
        
    except Exception as e:
        print(f"❌ Full appraisal test error: {e}")
        return False

async def main():
    """Main test function"""
    print("🧪 NFT Appraisal System Integration Tests")
    print("=" * 60)
    
    # Check if API gateway is running
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=5)
        if response.status_code != 200:
            print("❌ API gateway is not responding correctly")
            print("Please start the API gateway first:")
            print("python start_api_gateway.py")
            return
    except Exception as e:
        print("❌ Cannot connect to API gateway")
        print("Please start the API gateway first:")
        print("python start_api_gateway.py")
        print(f"Error: {e}")
        return
    
    print("✅ API gateway is running")
    print()
    
    # Run tests
    tests_passed = 0
    total_tests = 2
    
    # Test 1: API endpoints
    if test_api_endpoints():
        tests_passed += 1
    
    print()
    
    # Test 2: Full appraisal flow
    if await test_full_appraisal():
        tests_passed += 1
    
    print()
    print("=" * 60)
    print(f"🎯 Test Results: {tests_passed}/{total_tests} passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! The integration is working correctly.")
    else:
        print("⚠️ Some tests failed. Please check the output above.")
    
    print("\n💡 Next Steps:")
    print("1. Start the frontend: npm start (in frontend directory)")
    print("2. Open http://localhost:3000")
    print("3. Try the new appraisal form with real NFT queries")

if __name__ == "__main__":
    asyncio.run(main())
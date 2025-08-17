#!/usr/bin/env python3
"""
Startup script for the NFT Appraisal API Gateway

This script starts the FastAPI server with proper configuration
"""

import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import websockets
        import pydantic
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please install requirements:")
        print("pip install -r api_requirements.txt")
        return False

def check_files():
    """Check if required files exist"""
    required_files = [
        "api_gateway.py",
        "consensus_api_models.py", 
        "log_stream_manager.py"
    ]
    
    missing = []
    for file in required_files:
        if not Path(file).exists():
            missing.append(file)
    
    if missing:
        print(f"❌ Missing required files: {', '.join(missing)}")
        return False
    
    print("✅ All required files found")
    return True

def start_server():
    """Start the FastAPI server"""
    print("🚀 Starting NFT Appraisal API Gateway...")
    print("📡 Server will be available at: http://localhost:8000")
    print("🔌 WebSocket endpoint: ws://localhost:8000/api/v1/stream/{session_id}")
    print("📊 Health check: http://localhost:8000")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn",
            "api_gateway:app",
            "--host", "0.0.0.0",
            "--port", "8000",
            "--reload",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")

def main():
    print("🤖 NFT Appraisal API Gateway Startup")
    print("=" * 60)
    
    # Check dependencies
    if not check_requirements():
        sys.exit(1)
    
    # Check files
    if not check_files():
        sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()
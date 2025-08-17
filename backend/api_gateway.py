"""
API Gateway Server - FastAPI with WebSocket for NFT Appraisal

This server provides REST and WebSocket endpoints for the NFT appraisal system,
connecting the frontend to the consensus agent with real-time streaming.
"""

import asyncio
import json
import time
import traceback
from uuid import uuid4
from typing import Dict, Optional
from datetime import datetime, timezone

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Import our models and systems
from consensus_api_models import (
    NFTAppraisalRequest,
    NFTAppraisalResponse,
    StreamingMessageType,
    ErrorStreamingMessage,
    LogLevel,
    AgentType
)

from log_stream_manager import (
    global_log_stream_manager,
    stream_consensus_log,
    stream_progress_update,
    StreamingLogContext
)

# --- FastAPI App Setup ---

app = FastAPI(
    title="NFT Consensus Appraisal API",
    description="Multi-agent NFT pricing with real-time streaming",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:5174",  # Vite alternative port
        "http://localhost:3000",  # React dev server
        "http://localhost:3001",  # Alternative port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Global State ---

# Active processing requests
active_requests: Dict[str, Dict] = {}

# Consensus agent connection (will be established)
consensus_agent_client = None

# --- Agent Communication Bridge ---

class ConsensusAgentClient:
    """Client to communicate with the consensus uAgent"""
    
    def __init__(self):
        self.consensus_agent_address = "agent1qwjapfxkm8e2gm2g6mpgm9v49crx30ujrue4usv7w8f5zywxrz4q7w52ku5"
        self.timeout = 300  # 5 minutes
    
    async def request_appraisal(self, request: NFTAppraisalRequest, session_id: str) -> NFTAppraisalResponse:
        """
        Request appraisal from consensus agent
        For now, this will simulate the process and integrate with actual agent later
        """
        try:
            await stream_consensus_log(session_id, "🧠 Connecting to consensus agent...")
            
            # Simulate the consensus agent processing
            # In real implementation, this would use uAgent communication
            await self._simulate_consensus_processing(request, session_id)
            
            # For now, return a mock structured response
            # This will be replaced with actual agent communication
            return await self._create_mock_response(request, session_id)
            
        except Exception as e:
            await stream_consensus_log(session_id, f"❌ Error in consensus agent communication: {str(e)}", LogLevel.ERROR)
            raise
    
    async def _simulate_consensus_processing(self, request: NFTAppraisalRequest, session_id: str):
        """Simulate the consensus agent processing with realistic timing and logs"""
        
        # Parse query
        await stream_progress_update(session_id, "parsing", 10, "🧠 ASI:One parsing NFT query...")
        await stream_consensus_log(session_id, f"📝 Parsing query: {request.query or f'{request.collection_name} #{request.token_id}'}")
        await asyncio.sleep(2)  # Simulate ASI:One parsing time
        
        # Query individual agents
        await stream_progress_update(session_id, "agents", 25, "🤖 Querying pricing agents...")
        
        agents = [
            ("OpenAI GPT-5", AgentType.OPENAI),
            ("Anthropic Claude", AgentType.ANTHROPIC), 
            ("Google Gemini", AgentType.GEMINI)
        ]
        
        for i, (agent_name, agent_type) in enumerate(agents):
            await stream_consensus_log(session_id, f"📡 Requesting pricing from {agent_name}...")
            
            # Simulate agent processing
            async with StreamingLogContext(session_id, agent_type, f"{agent_name} Analysis"):
                log_capture = global_log_stream_manager.get_log_capture(session_id, agent_type)
                
                # Simulate agent reasoning logs
                await asyncio.sleep(1)
                log_capture.info("🔍 Connecting to OpenSea MCP server...")
                await asyncio.sleep(2)
                
                collection_name = request.collection_name or "Pudgy Penguins" 
                token_id = request.token_id or "3532"
                
                log_capture.info(f"📊 Fetching metadata for {collection_name} #{token_id}")
                await asyncio.sleep(3)
                log_capture.info("✅ NFT metadata retrieved successfully")
                
                log_capture.info("🎯 Analyzing trait rarity and floor prices...")
                await asyncio.sleep(4)
                log_capture.info("📈 Found 6 traits with varying rarity levels")
                
                log_capture.info("🧮 Calculating fair market value using AI model...")
                await asyncio.sleep(3)
                
                # Simulate different price estimates
                prices = {"openai": 13.45, "anthropic": 13.82, "gemini": 13.67}
                agent_key = agent_type.value
                price = prices.get(agent_key, 13.5)
                
                log_capture.info(f"💰 Price estimate: {price} ETH (confidence: 87%)")
                log_capture.info("📝 Reasoning: Based on trait rarity analysis and recent comparable sales")
            
            progress = 25 + (i + 1) * 20
            await stream_progress_update(session_id, "agents", progress, f"✅ {agent_name} analysis complete")
        
        # Consensus building
        await stream_progress_update(session_id, "consensus", 85, "🔮 Building consensus with MeTTa reasoning...")
        await stream_consensus_log(session_id, "🧠 MeTTa symbolic reasoning analyzing agent agreements...")
        await asyncio.sleep(2)
        
        await stream_consensus_log(session_id, "📊 Statistical analysis: Strong consensus detected (CV: 1.4%)")
        await stream_consensus_log(session_id, "✨ ASI:One generating structured consensus analysis...")
        await asyncio.sleep(3)
        
        await stream_progress_update(session_id, "final", 100, "🎯 Consensus analysis complete!")
        await stream_consensus_log(session_id, "🎉 Multi-agent appraisal successful!")
    
    async def _create_mock_response(self, request: NFTAppraisalRequest, session_id: str) -> NFTAppraisalResponse:
        """Create a mock structured response"""
        from consensus_api_models import (
            NFTIdentity, AgentPricingAnalysis, TraitAnalysis, MarketData, 
            ConsensusAnalysis, ConsensusMetrics, ProcessingMetadata
        )
        
        # Parse request data
        if request.query:
            collection_name = "Pudgy Penguins"  # Would be parsed by ASI:One
            token_id = "3532"
        else:
            collection_name = request.collection_name or "Unknown Collection"
            token_id = request.token_id or "0"
        
        nft_identity = NFTIdentity(
            collection_name=collection_name,
            token_id=token_id,
            network=request.network,
            opensea_url=f"https://opensea.io/assets/ethereum/{collection_name.lower().replace(' ', '-')}/{token_id}"
        )
        
        # Mock agent analyses
        agent_analyses = [
            AgentPricingAnalysis(
                agent_type=AgentType.OPENAI,
                agent_name="OpenAI GPT-5 with MCP",
                price_eth=13.45,
                price_usd=27892.5,
                confidence=0.87,
                reasoning="Based on trait rarity analysis, this NFT features a rare Blue background (15% occurrence) and Crown hat (8% occurrence). Recent comparable sales and trait floor analysis suggest strong value above collection floor.",
                traits_analyzed=[
                    TraitAnalysis(
                        trait_type="Background",
                        value="Blue",
                        rarity_percentage=15.0,
                        floor_price_impact=2.3,
                        market_significance="Popular background with moderate rarity"
                    ),
                    TraitAnalysis(
                        trait_type="Hat",
                        value="Crown",
                        rarity_percentage=8.0,
                        floor_price_impact=4.2,
                        market_significance="High-value trait with strong market demand"
                    )
                ],
                market_data=MarketData(
                    collection_floor=11.2,
                    collection_volume_24h=156.7,
                    trait_floors={"Background_Blue": 12.8, "Hat_Crown": 15.1}
                ),
                processing_time_ms=12450,
                success=True
            ),
            AgentPricingAnalysis(
                agent_type=AgentType.ANTHROPIC,
                agent_name="Anthropic Claude with MCP",
                price_eth=13.82,
                price_usd=28681.6,
                confidence=0.90,
                reasoning="Comprehensive analysis shows this NFT has excellent trait combination. The Crown hat is particularly valuable with only 8% occurrence. Market trends indicate strong demand for this trait pairing.",
                traits_analyzed=[
                    TraitAnalysis(
                        trait_type="Eyes",
                        value="Sleepy",
                        rarity_percentage=22.0,
                        floor_price_impact=1.1,
                        market_significance="Common but well-regarded trait"
                    )
                ],
                market_data=MarketData(
                    collection_floor=11.2,
                    collection_volume_24h=156.7
                ),
                processing_time_ms=13890,
                success=True
            ),
            AgentPricingAnalysis(
                agent_type=AgentType.GEMINI,
                agent_name="Google Gemini with OpenSea",
                price_eth=13.67,
                price_usd=28366.4,
                confidence=0.85,
                reasoning="Market analysis reveals strong positioning for this trait combination. Recent sales velocity and collection health metrics support premium valuation.",
                traits_analyzed=[],
                market_data=MarketData(
                    collection_floor=11.2,
                    similar_sales=[
                        {"price": 13.2, "date": "2025-08-15", "traits_match": 0.8},
                        {"price": 14.1, "date": "2025-08-14", "traits_match": 0.6}
                    ]
                ),
                processing_time_ms=11230,
                success=True
            )
        ]
        
        # Consensus analysis
        consensus = ConsensusAnalysis(
            consensus_price_eth=13.65,
            confidence_score=0.875,
            strong_consensus=True,
            metrics=ConsensusMetrics(
                variance=0.034,
                standard_deviation=0.185,
                coefficient_of_variation=1.35,
                price_range_min=13.45,
                price_range_max=13.82,
                median_price=13.67
            ),
            consensus_reasoning="Strong consensus achieved across all three AI agents with minimal price variance (CV: 1.35%). All agents identified the rare Crown hat trait as the primary value driver, with consistent trait floor price analysis supporting the premium valuation.",
            market_positioning="This NFT is positioned 21.9% above collection floor price, justified by rare trait combination and strong market demand indicators.",
            risk_assessment="Low risk assessment due to strong agent agreement, established collection metrics, and consistent trait-based valuation methodology."
        )
        
        # Processing metadata  
        processing = ProcessingMetadata(
            total_processing_time_ms=45670,
            agents_queried=3,
            agents_responded=3,
            agents_timed_out=[],
            asi_one_model_used="asi1-agentic",
            consensus_method="MeTTa symbolic reasoning + ASI:One structured output"
        )
        
        return NFTAppraisalResponse(
            request_id=session_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            nft_identity=nft_identity,
            agent_analyses=agent_analyses,
            consensus=consensus,
            processing=processing,
            reasoning_logs=global_log_stream_manager.get_session_logs(session_id),
            success=True
        )

# Initialize consensus agent client
consensus_agent_client = ConsensusAgentClient()

# --- API Endpoints ---

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "NFT Consensus Appraisal API",
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "endpoints": {
            "appraise": "POST /api/v1/appraise",
            "status": "GET /api/v1/status/{request_id}",
            "websocket": "WS /api/v1/stream/{session_id}"
        }
    }

@app.post("/api/v1/appraise")
async def appraise_nft(request: NFTAppraisalRequest, background_tasks: BackgroundTasks):
    """
    Start NFT appraisal process
    
    Returns session_id and WebSocket URL for streaming logs
    """
    try:
        session_id = str(uuid4())
        
        # Validate request
        if not request.query and not (request.collection_name and request.token_id):
            raise HTTPException(
                status_code=400,
                detail="Must provide either 'query' or both 'collection_name' and 'token_id'"
            )
        
        # Initialize session
        active_requests[session_id] = {
            "request": request,
            "status": "starting",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "result": None
        }
        
        # Start background processing
        background_tasks.add_task(process_appraisal_async, request, session_id)
        
        return {
            "session_id": session_id,
            "websocket_url": f"/api/v1/stream/{session_id}",
            "status": "processing",
            "estimated_duration_seconds": 45,
            "message": "Appraisal started. Connect to WebSocket for real-time updates."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start appraisal: {str(e)}")

async def process_appraisal_async(request: NFTAppraisalRequest, session_id: str):
    """Background task to process appraisal with streaming"""
    try:
        # Update status
        active_requests[session_id]["status"] = "processing"
        
        # Process with consensus agent
        result = await consensus_agent_client.request_appraisal(request, session_id)
        
        # Store result
        active_requests[session_id]["result"] = result
        active_requests[session_id]["status"] = "completed"
        
        # Stream final result
        await global_log_stream_manager.stream_final_result(session_id, result)
        
    except Exception as e:
        # Handle errors
        active_requests[session_id]["status"] = "error" 
        active_requests[session_id]["error"] = str(e)
        
        # Stream error
        error_message = ErrorStreamingMessage(
            session_id=session_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            error_code="PROCESSING_ERROR",
            error_message=str(e)
        )
        
        if session_id in global_log_stream_manager.connections:
            try:
                await global_log_stream_manager.connections[session_id].send_text(
                    json.dumps(error_message.model_dump())
                )
            except:
                pass

@app.get("/api/v1/status/{request_id}")
async def get_appraisal_status(request_id: str):
    """Get status of appraisal request"""
    if request_id not in active_requests:
        raise HTTPException(status_code=404, detail="Request not found")
    
    request_data = active_requests[request_id]
    
    response = {
        "request_id": request_id,
        "status": request_data["status"],
        "created_at": request_data["created_at"]
    }
    
    if request_data.get("result"):
        response["result"] = request_data["result"]
    
    if request_data.get("error"):
        response["error"] = request_data["error"]
    
    return response

@app.websocket("/api/v1/stream/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for streaming logs and results"""
    await websocket.accept()
    
    # Register WebSocket
    global_log_stream_manager.register_websocket(session_id, websocket)
    
    try:
        # Send welcome message
        welcome_message = {
            "type": "connected",
            "session_id": session_id,
            "message": "Connected to NFT appraisal stream",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await websocket.send_text(json.dumps(welcome_message))
        
        # Keep connection alive and handle any incoming messages
        while True:
            try:
                # Wait for messages (mostly just keep-alive)
                data = await asyncio.wait_for(websocket.receive_text(), timeout=1.0)
                # Echo back for debugging
                await websocket.send_text(f"echo: {data}")
            except asyncio.TimeoutError:
                # Send ping to keep connection alive
                await websocket.send_text(json.dumps({"type": "ping", "timestamp": datetime.now(timezone.utc).isoformat()}))
            except WebSocketDisconnect:
                break
            
    except WebSocketDisconnect:
        pass
    finally:
        # Cleanup
        global_log_stream_manager.unregister_websocket(session_id)

@app.get("/api/v1/logs/{session_id}")
async def get_session_logs(session_id: str):
    """Get all logs for a session (backup to WebSocket)"""
    logs = global_log_stream_manager.get_session_logs(session_id)
    
    return {
        "session_id": session_id,
        "logs": {agent_type.value: [log.model_dump() for log in log_list] 
                for agent_type, log_list in logs.items()}
    }

# --- Cleanup and Management ---

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    print("🚀 Starting NFT Consensus Appraisal API")
    print(f"📡 WebSocket streaming enabled")
    print(f"🤖 Consensus agent integration ready")

@app.on_event("shutdown") 
async def shutdown_event():
    """Cleanup on shutdown"""
    print("🛑 Shutting down NFT Consensus Appraisal API")
    
    # Close all WebSocket connections
    for session_id in list(global_log_stream_manager.connections.keys()):
        global_log_stream_manager.cleanup_session(session_id)

# --- Development Server ---

if __name__ == "__main__":
    uvicorn.run(
        "api_gateway:app",
        host="0.0.0.0", 
        port=8000,
        reload=True,
        log_level="info"
    )
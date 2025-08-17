"""
Consensus API Models - Backend-Native Data Structures

These models are optimized for the natural output of the consensus agent
and pricing agents, designed for real-time streaming and ASI:One integration.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from enum import Enum
from datetime import datetime

class AgentType(str, Enum):
    """Supported AI agent types"""
    OPENAI = "openai"
    ANTHROPIC = "anthropic" 
    GEMINI = "gemini"
    CONSENSUS = "consensus"

class LogLevel(str, Enum):
    """Log severity levels"""
    DEBUG = "debug"
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"

class StreamingLog(BaseModel):
    """Real-time log entry from agents"""
    timestamp: str = Field(description="ISO timestamp of log entry")
    agent: AgentType = Field(description="Agent that generated this log")
    level: LogLevel = Field(description="Log severity level")
    message: str = Field(description="Log message content")
    metadata: Optional[Dict[str, Any]] = Field(default=None, description="Additional log metadata")

class NFTIdentity(BaseModel):
    """NFT identification from parsing user query"""
    collection_name: str = Field(description="NFT collection name (e.g., 'Pudgy Penguins')")
    token_id: str = Field(description="Token ID within collection")
    network: str = Field(default="ethereum", description="Blockchain network")
    contract_address: Optional[str] = Field(default=None, description="Smart contract address")
    opensea_url: Optional[str] = Field(default=None, description="Direct OpenSea URL")

class TraitAnalysis(BaseModel):
    """Individual trait analysis from agents"""
    trait_type: str = Field(description="Type of trait (e.g., 'Background', 'Hat')")
    value: str = Field(description="Trait value (e.g., 'Blue', 'Crown')")
    rarity_percentage: Optional[float] = Field(default=None, description="Rarity as percentage (0-100)")
    floor_price_impact: Optional[float] = Field(default=None, description="Impact on floor price in ETH")
    market_significance: Optional[str] = Field(default=None, description="Textual significance description")

class MarketData(BaseModel):
    """Market data collected by agents"""
    collection_floor: Optional[float] = Field(default=None, description="Collection floor price in ETH")
    collection_volume_24h: Optional[float] = Field(default=None, description="24h volume in ETH")
    similar_sales: Optional[List[Dict[str, Any]]] = Field(default=None, description="Similar NFT sales data")
    trait_floors: Optional[Dict[str, float]] = Field(default=None, description="Floor prices by trait")
    market_trends: Optional[Dict[str, Any]] = Field(default=None, description="Market trend indicators")

class AgentPricingAnalysis(BaseModel):
    """Individual agent's complete pricing analysis"""
    agent_type: AgentType = Field(description="Type of AI agent")
    agent_name: str = Field(description="Human-readable agent name")
    price_eth: float = Field(description="Estimated price in ETH")
    price_usd: Optional[float] = Field(default=None, description="Estimated price in USD")
    confidence: float = Field(ge=0.0, le=1.0, description="Confidence score (0.0 to 1.0)")
    reasoning: str = Field(description="Detailed reasoning for price estimate")
    
    # Detailed analysis data
    traits_analyzed: List[TraitAnalysis] = Field(default_factory=list, description="Traits analyzed by agent")
    market_data: MarketData = Field(default_factory=MarketData, description="Market data used in analysis")
    
    # Processing metadata
    processing_time_ms: int = Field(description="Time taken to analyze in milliseconds")
    success: bool = Field(description="Whether analysis completed successfully")
    error_message: Optional[str] = Field(default=None, description="Error message if analysis failed")

class ConsensusMetrics(BaseModel):
    """Statistical metrics for consensus analysis"""
    variance: float = Field(description="Price variance across agents")
    standard_deviation: float = Field(description="Standard deviation of prices")
    coefficient_of_variation: float = Field(description="Coefficient of variation percentage")
    price_range_min: float = Field(description="Minimum price from agents")
    price_range_max: float = Field(description="Maximum price from agents")
    median_price: float = Field(description="Median price from agents")

class ConsensusAnalysis(BaseModel):
    """MeTTa + ASI:One consensus results"""
    consensus_price_eth: float = Field(description="Final consensus price in ETH")
    confidence_score: float = Field(ge=0.0, le=1.0, description="Overall confidence in consensus")
    strong_consensus: bool = Field(description="Whether strong consensus was achieved")
    
    # Statistical analysis
    metrics: ConsensusMetrics = Field(description="Statistical metrics")
    
    # Consensus process results
    outliers_detected: List[AgentType] = Field(default_factory=list, description="Agents identified as outliers")
    challenges_issued: int = Field(default=0, description="Number of challenge rounds executed")
    challenge_responses: List[str] = Field(default_factory=list, description="Responses from challenged agents")
    
    # ASI:One generated analysis
    consensus_reasoning: str = Field(description="ASI:One generated reasoning for consensus")
    market_positioning: str = Field(description="Analysis of how price fits in market context")
    risk_assessment: str = Field(description="Risk factors and considerations")
    
    # MeTTa symbolic reasoning results
    metta_rules_applied: List[str] = Field(default_factory=list, description="MeTTa rules used in analysis")
    symbolic_confidence: float = Field(default=0.8, description="Confidence from symbolic reasoning")

class ProcessingMetadata(BaseModel):
    """Metadata about the appraisal process"""
    total_processing_time_ms: int = Field(description="Total time for complete appraisal")
    agents_queried: int = Field(description="Number of agents queried")
    agents_responded: int = Field(description="Number of agents that responded successfully")
    agents_timed_out: List[AgentType] = Field(default_factory=list, description="Agents that timed out")
    asi_one_model_used: str = Field(description="ASI:One model version used")
    consensus_method: str = Field(description="Method used for consensus building")

class NFTAppraisalRequest(BaseModel):
    """Request for NFT appraisal - flexible input format"""
    # Option 1: Natural language query
    query: Optional[str] = Field(default=None, description="Natural language query (e.g., 'Price Pudgy Penguins #3532')")
    
    # Option 2: Structured input
    collection_name: Optional[str] = Field(default=None, description="Collection name")
    token_id: Optional[str] = Field(default=None, description="Token ID")
    network: str = Field(default="ethereum", description="Blockchain network")
    
    # Option 3: Contract address (legacy support)
    contract_address: Optional[str] = Field(default=None, description="Contract address for legacy compatibility")
    
    # Request preferences
    include_streaming_logs: bool = Field(default=True, description="Whether to provide streaming logs")
    max_processing_time_minutes: int = Field(default=5, description="Maximum processing time in minutes")

class NFTAppraisalResponse(BaseModel):
    """Complete NFT appraisal response - backend native format"""
    # Request tracking
    request_id: str = Field(description="Unique request identifier")
    timestamp: str = Field(description="Response timestamp (ISO format)")
    
    # NFT identification
    nft_identity: NFTIdentity = Field(description="Parsed NFT identity")
    
    # Core analysis results
    agent_analyses: List[AgentPricingAnalysis] = Field(description="Individual agent analyses")
    consensus: ConsensusAnalysis = Field(description="Consensus analysis results")
    
    # Processing information
    processing: ProcessingMetadata = Field(description="Processing metadata")
    
    # Captured logs for transparency
    reasoning_logs: Dict[AgentType, List[str]] = Field(
        default_factory=dict, 
        description="Captured reasoning logs by agent"
    )
    
    # Status
    success: bool = Field(description="Whether appraisal completed successfully")
    error_message: Optional[str] = Field(default=None, description="Error message if appraisal failed")

# WebSocket streaming message types

class StreamingMessageType(str, Enum):
    """Types of streaming messages"""
    LOG = "log"
    PROGRESS = "progress"
    AGENT_RESULT = "agent_result"
    CONSENSUS_UPDATE = "consensus_update"
    FINAL_RESULT = "final_result"
    ERROR = "error"

class StreamingMessage(BaseModel):
    """Base class for all streaming messages"""
    type: StreamingMessageType = Field(description="Message type")
    timestamp: str = Field(description="Message timestamp")
    session_id: str = Field(description="Session identifier")

class LogStreamingMessage(StreamingMessage):
    """Streaming log message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.LOG)
    log: StreamingLog = Field(description="Log entry")

class ProgressStreamingMessage(StreamingMessage):
    """Progress update message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.PROGRESS)
    stage: str = Field(description="Current processing stage")
    progress_percentage: float = Field(ge=0.0, le=100.0, description="Progress percentage")
    message: str = Field(description="Human-readable progress message")

class AgentResultStreamingMessage(StreamingMessage):
    """Individual agent result message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.AGENT_RESULT)
    agent_analysis: AgentPricingAnalysis = Field(description="Agent's analysis result")

class ConsensusUpdateStreamingMessage(StreamingMessage):
    """Consensus building update message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.CONSENSUS_UPDATE)
    stage: str = Field(description="Consensus building stage")
    partial_consensus: Optional[Dict[str, Any]] = Field(default=None, description="Partial consensus data")

class FinalResultStreamingMessage(StreamingMessage):
    """Final appraisal result message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.FINAL_RESULT)
    result: NFTAppraisalResponse = Field(description="Complete appraisal result")

class ErrorStreamingMessage(StreamingMessage):
    """Error message"""
    type: StreamingMessageType = Field(default=StreamingMessageType.ERROR)
    error_code: str = Field(description="Error code")
    error_message: str = Field(description="Human-readable error message")
    agent: Optional[AgentType] = Field(default=None, description="Agent that caused error, if applicable")

# Union type for all streaming messages
StreamingMessageUnion = LogStreamingMessage | ProgressStreamingMessage | AgentResultStreamingMessage | ConsensusUpdateStreamingMessage | FinalResultStreamingMessage | ErrorStreamingMessage
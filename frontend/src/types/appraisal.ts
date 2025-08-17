// Frontend types aligned with backend Pydantic models

export type AgentType = 'openai' | 'anthropic' | 'gemini' | 'consensus';
export type LogLevel = 'debug' | 'info' | 'warning' | 'error';

// Runtime constants for the types
export const AGENT_TYPES = ['openai', 'anthropic', 'gemini', 'consensus'] as const;
export const LOG_LEVELS = ['debug', 'info', 'warning', 'error'] as const;

// NFT Identity
export interface NFTIdentity {
  collectionName: string;
  tokenId: string;
  network: string;
  contractAddress?: string;
  openseaUrl?: string;
}

// Trait Analysis
export interface TraitAnalysis {
  traitType: string;
  value: string;
  rarityPercentage?: number;
  floorPriceImpact?: number;
  marketSignificance?: string;
}

// Market Data
export interface MarketData {
  collectionFloor?: number;
  collectionVolume24h?: number;
  similarSales?: Array<{
    price: number;
    date: string;
    traitsMatch: number;
  }>;
  traitFloors?: Record<string, number>;
  marketTrends?: Record<string, any>;
}

// Individual Agent Analysis
export interface AgentPricingAnalysis {
  agentType: AgentType;
  agentName: string;
  priceEth: number;
  priceUsd?: number;
  confidence: number; // 0.0 to 1.0
  reasoning: string;
  traitsAnalyzed: TraitAnalysis[];
  marketData: MarketData;
  processingTimeMs: number;
  success: boolean;
  errorMessage?: string;
}

// Consensus Metrics
export interface ConsensusMetrics {
  variance: number;
  standardDeviation: number;
  coefficientOfVariation: number;
  priceRangeMin: number;
  priceRangeMax: number;
  medianPrice: number;
}

// Consensus Analysis
export interface ConsensusAnalysis {
  consensusPriceEth: number;
  confidenceScore: number;
  strongConsensus: boolean;
  metrics: ConsensusMetrics;
  outliersDetected: AgentType[];
  challengesIssued: number;
  challengeResponses: string[];
  consensusReasoning: string;
  marketPositioning: string;
  riskAssessment: string;
  mettaRulesApplied: string[];
  symbolicConfidence: number;
}

// Processing Metadata
export interface ProcessingMetadata {
  totalProcessingTimeMs: number;
  agentsQueried: number;
  agentsResponded: number;
  agentsTimedOut: AgentType[];
  asiOneModelUsed: string;
  consensusMethod: string;
}

// Main Appraisal Response
export interface NFTAppraisalResponse {
  requestId: string;
  timestamp: string;
  nftIdentity: NFTIdentity;
  agentAnalyses: AgentPricingAnalysis[];
  consensus: ConsensusAnalysis;
  processing: ProcessingMetadata;
  reasoningLogs: Record<AgentType, string[]>;
  success: boolean;
  errorMessage?: string;
}

// Request types
export interface NFTAppraisalRequest {
  query?: string; // Natural language query
  collectionName?: string; // Structured input
  tokenId?: string;
  network?: string;
  contractAddress?: string; // Legacy support
  includeStreamingLogs?: boolean;
  maxProcessingTimeMinutes?: number;
}

// WebSocket streaming types
export type StreamingMessageType = 
  | 'log' 
  | 'progress' 
  | 'agent_result' 
  | 'consensus_update' 
  | 'final_result' 
  | 'error'
  | 'connected'
  | 'ping';

export interface StreamingLog {
  timestamp: string;
  agent: AgentType;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
}

export interface BaseStreamingMessage {
  type: StreamingMessageType;
  timestamp: string;
  sessionId: string;
}

export interface LogStreamingMessage extends BaseStreamingMessage {
  type: 'log';
  log: StreamingLog;
}

export interface ProgressStreamingMessage extends BaseStreamingMessage {
  type: 'progress';
  stage: string;
  progressPercentage: number;
  message: string;
}

export interface AgentResultStreamingMessage extends BaseStreamingMessage {
  type: 'agent_result';
  agentAnalysis: AgentPricingAnalysis;
}

export interface ConsensusUpdateStreamingMessage extends BaseStreamingMessage {
  type: 'consensus_update';
  stage: string;
  partialConsensus?: Record<string, any>;
}

export interface FinalResultStreamingMessage extends BaseStreamingMessage {
  type: 'final_result';
  result: NFTAppraisalResponse;
}

export interface ErrorStreamingMessage extends BaseStreamingMessage {
  type: 'error';
  errorCode: string;
  errorMessage: string;
  agent?: AgentType;
}

export interface ConnectedStreamingMessage extends BaseStreamingMessage {
  type: 'connected';
  message: string;
}

export interface PingStreamingMessage extends BaseStreamingMessage {
  type: 'ping';
}

export type StreamingMessage = 
  | LogStreamingMessage
  | ProgressStreamingMessage
  | AgentResultStreamingMessage
  | ConsensusUpdateStreamingMessage
  | FinalResultStreamingMessage
  | ErrorStreamingMessage
  | ConnectedStreamingMessage
  | PingStreamingMessage;

// API Response types
export interface AppraisalStartResponse {
  sessionId: string;
  websocketUrl: string;
  status: string;
  estimatedDurationSeconds: number;
  message: string;
}

export interface AppraisalStatusResponse {
  requestId: string;
  status: 'starting' | 'processing' | 'completed' | 'error';
  createdAt: string;
  result?: NFTAppraisalResponse;
  error?: string;
}

// UI State types
export interface AppraisalUIState {
  // Loading states
  isProcessing: boolean;
  isConnected: boolean;
  
  // Progress tracking
  currentStage: string;
  progressPercentage: number;
  
  // Data
  appraisal: NFTAppraisalResponse | null;
  
  // Streaming logs organized by agent
  streamingLogs: Record<AgentType, StreamingLog[]>;
  
  // Agent analysis results as they come in
  agentResults: Partial<Record<AgentType, AgentPricingAnalysis>>;
  
  // Error handling
  error: string | null;
  
  // WebSocket connection
  webSocket: WebSocket | null;
  sessionId: string | null;
}

// Helper types for UI components
export interface AgentCardData {
  agentType: AgentType;
  agentName: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  logs: StreamingLog[];
  analysis?: AgentPricingAnalysis;
  processingTimeMs?: number;
}

export interface ConsensusCardData {
  status: 'idle' | 'building' | 'completed' | 'error';
  consensus?: ConsensusAnalysis;
  participatingAgents: AgentType[];
  consensusLogs: StreamingLog[];
}

// Form types
export interface AppraisalFormData {
  queryType: 'natural' | 'structured';
  query: string;
  collectionName: string;
  tokenId: string;
  network: string;
}

// Utility types for formatting
export interface FormattedPrice {
  eth: string;
  usd: string;
  formatted: string;
}

export interface FormattedTimeData {
  duration: string;
  timestamp: string;
  relative: string;
}
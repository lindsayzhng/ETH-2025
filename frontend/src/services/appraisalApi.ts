// API client for NFT appraisal service

import type {
  NFTAppraisalRequest,
  NFTAppraisalResponse,
  AppraisalStartResponse,
  AppraisalStatusResponse,
  StreamingMessage,
  StreamingLog,
  AgentType,
  LogLevel
} from '../types/appraisal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export class AppraisalApiClient {
  
  /**
   * Start an NFT appraisal request
   */
  async startAppraisal(request: NFTAppraisalRequest): Promise<AppraisalStartResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/appraise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to start appraisal');
    }

    return response.json();
  }

  /**
   * Get status of an appraisal request
   */
  async getAppraisalStatus(requestId: string): Promise<AppraisalStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/status/${requestId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Appraisal request not found');
      }
      throw new Error('Failed to get appraisal status');
    }

    return response.json();
  }

  /**
   * Get session logs (backup to WebSocket)
   */
  async getSessionLogs(sessionId: string): Promise<Record<AgentType, StreamingLog[]>> {
    const response = await fetch(`${API_BASE_URL}/api/v1/logs/${sessionId}`);

    if (!response.ok) {
      throw new Error('Failed to get session logs');
    }

    const data = await response.json();
    return data.logs;
  }

  /**
   * Create WebSocket connection for streaming
   */
  createWebSocketConnection(
    sessionId: string,
    onMessage: (message: StreamingMessage) => void,
    onError: (error: Event) => void,
    onClose: (event: CloseEvent) => void,
    onOpen?: (event: Event) => void
  ): WebSocket {
    const wsUrl = `${WS_BASE_URL}/api/v1/stream/${sessionId}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = (event) => {
      console.log('WebSocket connected:', sessionId);
      onOpen?.(event);
    };

    ws.onmessage = (event) => {
      try {
        const message: StreamingMessage = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError(error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      onClose(event);
    };

    return ws;
  }
}

// Singleton instance
export const appraisalApi = new AppraisalApiClient();

// Helper functions for working with the API

/**
 * Create an appraisal request from form data
 */
export function createAppraisalRequest(formData: {
  queryType: 'natural' | 'structured';
  query: string;
  collectionName: string;
  tokenId: string;
  network: string;
}): NFTAppraisalRequest {
  if (formData.queryType === 'natural') {
    return {
      query: formData.query,
      network: formData.network || 'ethereum',
      includeStreamingLogs: true,
      maxProcessingTimeMinutes: 5,
    };
  } else {
    return {
      collectionName: formData.collectionName,
      tokenId: formData.tokenId,
      network: formData.network || 'ethereum',
      includeStreamingLogs: true,
      maxProcessingTimeMinutes: 5,
    };
  }
}

/**
 * Format price for display
 */
export function formatPrice(priceEth: number, priceUsd?: number): {
  eth: string;
  usd: string;
  formatted: string;
} {
  const ethFormatted = priceEth.toFixed(3);
  const usdFormatted = priceUsd ? `$${priceUsd.toLocaleString()}` : '';
  
  return {
    eth: `${ethFormatted} ETH`,
    usd: usdFormatted,
    formatted: usdFormatted ? `${ethFormatted} ETH (${usdFormatted})` : `${ethFormatted} ETH`,
  };
}

/**
 * Format processing time
 */
export function formatProcessingTime(timeMs: number): string {
  if (timeMs < 1000) {
    return `${timeMs}ms`;
  } else if (timeMs < 60000) {
    return `${(timeMs / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}

/**
 * Format confidence percentage
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(1)}%`;
}

/**
 * Get agent display name
 */
export function getAgentDisplayName(agentType: AgentType): string {
  const names = {
    openai: 'OpenAI GPT-5',
    anthropic: 'Anthropic Claude',
    gemini: 'Google Gemini',
    consensus: 'Consensus Engine',
  };
  return names[agentType] || agentType;
}

/**
 * Get agent color for UI
 */
export function getAgentColor(agentType: AgentType): string {
  const colors = {
    openai: '#10B981', // green
    anthropic: '#8B5CF6', // purple  
    gemini: '#F59E0B', // amber
    consensus: '#3B82F6', // blue
  };
  return colors[agentType] || '#6B7280';
}

/**
 * Get log level color
 */
export function getLogLevelColor(level: LogLevel): string {
  const colors = {
    debug: '#6B7280', // gray
    info: '#3B82F6',  // blue
    warning: '#F59E0B', // amber
    error: '#EF4444',   // red
  };
  return colors[level] || '#6B7280';
}

/**
 * Parse collection and token from natural query
 */
export function parseNaturalQuery(query: string): {
  collection?: string;
  tokenId?: string;
} {
  // Simple regex patterns for common formats
  const patterns = [
    /price\s+(.+?)\s*#(\d+)/i,
    /(.+?)\s*#(\d+)/i,
    /(.+?)\s+(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      return {
        collection: match[1].trim(),
        tokenId: match[2].trim(),
      };
    }
  }

  return {};
}

/**
 * Validate appraisal request
 */
export function validateAppraisalRequest(request: NFTAppraisalRequest): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.query && (!request.collectionName || !request.tokenId)) {
    errors.push('Must provide either a natural language query or collection name and token ID');
  }

  if (request.query && request.query.trim().length < 3) {
    errors.push('Query must be at least 3 characters long');
  }

  if (request.collectionName && request.collectionName.trim().length < 2) {
    errors.push('Collection name must be at least 2 characters long');
  }

  if (request.tokenId && !/^\d+$/.test(request.tokenId)) {
    errors.push('Token ID must be a number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Error classes for better error handling
export class AppraisalApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AppraisalApiError';
  }
}

export class WebSocketError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = 'WebSocketError';
  }
}
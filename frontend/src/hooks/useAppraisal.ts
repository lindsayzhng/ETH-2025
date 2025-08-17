// Custom hook for managing NFT appraisal state and WebSocket connections

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  NFTAppraisalRequest,
  NFTAppraisalResponse,
  AppraisalUIState,
  StreamingMessage,
  StreamingLog,
  AgentType,
  AgentPricingAnalysis,
} from '../types/appraisal';
import {
  appraisalApi,
  createAppraisalRequest,
  validateAppraisalRequest,
} from '../services/appraisalApi';

export interface UseAppraisalOptions {
  onComplete?: (result: NFTAppraisalResponse) => void;
  onError?: (error: string) => void;
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
}

export function useAppraisal(options: UseAppraisalOptions = {}) {
  const {
    onComplete,
    onError,
    autoReconnect = true,
    maxReconnectAttempts = 3,
  } = options;

  // Main state
  const [state, setState] = useState<AppraisalUIState>({
    isProcessing: false,
    isConnected: false,
    currentStage: '',
    progressPercentage: 0,
    appraisal: null,
    streamingLogs: {
      openai: [],
      anthropic: [],
      gemini: [],
      consensus: [],
    },
    agentResults: {},
    error: null,
    webSocket: null,
    sessionId: null,
  });

  // Refs for managing WebSocket lifecycle
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update state helper
  const updateState = useCallback((updates: Partial<AppraisalUIState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Add log to specific agent
  const addLog = useCallback((log: StreamingLog) => {
    setState((prev) => ({
      ...prev,
      streamingLogs: {
        ...prev.streamingLogs,
        [log.agent]: [...prev.streamingLogs[log.agent], log],
      },
    }));
  }, []);

  // Add agent result
  const addAgentResult = useCallback((analysis: AgentPricingAnalysis) => {
    setState((prev) => ({
      ...prev,
      agentResults: {
        ...prev.agentResults,
        [analysis.agentType]: analysis,
      },
    }));
  }, []);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((message: StreamingMessage) => {
    console.log('WebSocket message:', message);

    switch (message.type) {
      case 'connected':
        updateState({ isConnected: true, error: null });
        reconnectAttemptsRef.current = 0;
        break;

      case 'log':
        addLog(message.log);
        break;

      case 'progress':
        updateState({
          currentStage: message.stage,
          progressPercentage: message.progressPercentage,
        });
        break;

      case 'agent_result':
        addAgentResult(message.agentAnalysis);
        break;

      case 'consensus_update':
        // Handle consensus building updates
        break;

      case 'final_result':
        updateState({
          appraisal: message.result,
          isProcessing: false,
          progressPercentage: 100,
        });
        onComplete?.(message.result);
        break;

      case 'error':
        const errorMsg = `${message.errorCode}: ${message.errorMessage}`;
        updateState({
          error: errorMsg,
          isProcessing: false,
        });
        onError?.(errorMsg);
        break;

      case 'ping':
        // Keep-alive, no action needed
        break;

      default:
        console.log('Unknown message type:', message);
    }
  }, [addLog, addAgentResult, updateState, onComplete, onError]);

  // WebSocket connection management
  const connectWebSocket = useCallback((sessionId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    try {
      const ws = appraisalApi.createWebSocketConnection(
        sessionId,
        handleWebSocketMessage,
        (error) => {
          console.error('WebSocket error:', error);
          updateState({ isConnected: false });
          
          // Auto-reconnect logic
          if (autoReconnect && reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current++;
            console.log(`Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket(sessionId);
            }, 2000 * reconnectAttemptsRef.current); // Exponential backoff
          } else {
            updateState({ error: 'WebSocket connection failed' });
            onError?.('WebSocket connection failed');
          }
        },
        (event) => {
          console.log('WebSocket closed:', event);
          updateState({ isConnected: false });
          
          // Auto-reconnect on unexpected close
          if (autoReconnect && event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current++;
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket(sessionId);
            }, 2000);
          }
        },
        () => {
          console.log('WebSocket opened');
          updateState({ isConnected: true });
        }
      );

      wsRef.current = ws;
      updateState({ webSocket: ws });

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      updateState({ error: 'Failed to connect to streaming service' });
      onError?.('Failed to connect to streaming service');
    }
  }, [handleWebSocketMessage, updateState, autoReconnect, maxReconnectAttempts, onError]);

  // Cleanup WebSocket
  const disconnectWebSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'Component unmounting');
      wsRef.current = null;
    }

    updateState({ webSocket: null, isConnected: false });
  }, [updateState]);

  // Start appraisal
  const startAppraisal = useCallback(async (
    formData: {
      queryType: 'natural' | 'structured';
      query: string;
      collectionName: string;
      tokenId: string;
      network: string;
    }
  ) => {
    try {
      // Reset state
      setState({
        isProcessing: true,
        isConnected: false,
        currentStage: 'starting',
        progressPercentage: 0,
        appraisal: null,
        streamingLogs: {
          openai: [],
          anthropic: [],
          gemini: [],
          consensus: [],
        },
        agentResults: {},
        error: null,
        webSocket: null,
        sessionId: null,
      });

      // Create and validate request
      const request = createAppraisalRequest(formData);
      const validation = validateAppraisalRequest(request);

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Start appraisal
      const response = await appraisalApi.startAppraisal(request);
      
      updateState({
        sessionId: response.sessionId,
        currentStage: 'connecting',
      });

      // Connect WebSocket for streaming
      connectWebSocket(response.sessionId);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      updateState({
        error: errorMessage,
        isProcessing: false,
      });
      onError?.(errorMessage);
    }
  }, [updateState, connectWebSocket, onError]);

  // Cancel appraisal
  const cancelAppraisal = useCallback(() => {
    disconnectWebSocket();
    updateState({
      isProcessing: false,
      currentStage: 'cancelled',
      error: 'Appraisal cancelled by user',
    });
  }, [disconnectWebSocket, updateState]);

  // Reset state
  const reset = useCallback(() => {
    disconnectWebSocket();
    setState({
      isProcessing: false,
      isConnected: false,
      currentStage: '',
      progressPercentage: 0,
      appraisal: null,
      streamingLogs: {
        openai: [],
        anthropic: [],
        gemini: [],
        consensus: [],
      },
      agentResults: {},
      error: null,
      webSocket: null,
      sessionId: null,
    });
  }, [disconnectWebSocket]);

  // Get logs for specific agent
  const getAgentLogs = useCallback((agentType: AgentType) => {
    return state.streamingLogs[agentType] || [];
  }, [state.streamingLogs]);

  // Get agent analysis
  const getAgentAnalysis = useCallback((agentType: AgentType) => {
    return state.agentResults[agentType];
  }, [state.agentResults]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, [disconnectWebSocket]);

  return {
    // State
    state,
    
    // Actions
    startAppraisal,
    cancelAppraisal,
    reset,
    
    // Helpers
    getAgentLogs,
    getAgentAnalysis,
    
    // Connection status
    isConnected: state.isConnected,
    isProcessing: state.isProcessing,
    error: state.error,
    
    // Progress
    currentStage: state.currentStage,
    progressPercentage: state.progressPercentage,
    
    // Results
    appraisal: state.appraisal,
    agentResults: state.agentResults,
    
    // Session info
    sessionId: state.sessionId,
  };
}
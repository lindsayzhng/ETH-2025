"""
Log Stream Manager - Captures and streams agent reasoning logs

This module provides functionality to capture logs from agents in real-time
and stream them to connected WebSocket clients.
"""

import asyncio
import json
import logging
import time
from typing import Dict, List, Optional, Callable, Any
from datetime import datetime, timezone
from dataclasses import dataclass, asdict

from consensus_api_models import (
    StreamingLog,
    LogLevel,
    AgentType,
    StreamingMessage,
    LogStreamingMessage,
    ProgressStreamingMessage,
    StreamingMessageType
)

class LogStreamCapture:
    """Custom logging handler that captures logs for streaming"""
    
    def __init__(self, agent_type: AgentType, session_id: str, stream_manager: 'LogStreamManager'):
        self.agent_type = agent_type
        self.session_id = session_id
        self.stream_manager = stream_manager
        self.log_buffer: List[StreamingLog] = []
        
    def capture_log(self, level: LogLevel, message: str, metadata: Optional[Dict[str, Any]] = None):
        """Capture a log entry"""
        log_entry = StreamingLog(
            timestamp=datetime.now(timezone.utc).isoformat(),
            agent=self.agent_type,
            level=level,
            message=message,
            metadata=metadata
        )
        
        self.log_buffer.append(log_entry)
        
        # Stream to connected clients
        asyncio.create_task(
            self.stream_manager.stream_log(self.session_id, log_entry)
        )
    
    def info(self, message: str, metadata: Optional[Dict[str, Any]] = None):
        """Log info message"""
        self.capture_log(LogLevel.INFO, message, metadata)
    
    def debug(self, message: str, metadata: Optional[Dict[str, Any]] = None):
        """Log debug message"""
        self.capture_log(LogLevel.DEBUG, message, metadata)
    
    def warning(self, message: str, metadata: Optional[Dict[str, Any]] = None):
        """Log warning message"""
        self.capture_log(LogLevel.WARNING, message, metadata)
    
    def error(self, message: str, metadata: Optional[Dict[str, Any]] = None):
        """Log error message"""
        self.capture_log(LogLevel.ERROR, message, metadata)

class LogStreamManager:
    """Manages log streaming for multiple sessions"""
    
    def __init__(self):
        # WebSocket connections by session_id
        self.connections: Dict[str, Any] = {}  # Will hold WebSocket connections
        
        # Log buffers by session_id and agent
        self.session_logs: Dict[str, Dict[AgentType, List[StreamingLog]]] = {}
        
        # Log captures by session_id and agent
        self.log_captures: Dict[str, Dict[AgentType, LogStreamCapture]] = {}
        
        # Progress tracking
        self.session_progress: Dict[str, Dict[str, Any]] = {}
    
    def register_websocket(self, session_id: str, websocket):
        """Register a WebSocket connection for a session"""
        self.connections[session_id] = websocket
        
        # Initialize session logs
        if session_id not in self.session_logs:
            self.session_logs[session_id] = {
                AgentType.OPENAI: [],
                AgentType.ANTHROPIC: [],
                AgentType.GEMINI: [],
                AgentType.CONSENSUS: []
            }
        
        # Initialize log captures
        if session_id not in self.log_captures:
            self.log_captures[session_id] = {}
            for agent_type in [AgentType.OPENAI, AgentType.ANTHROPIC, AgentType.GEMINI, AgentType.CONSENSUS]:
                self.log_captures[session_id][agent_type] = LogStreamCapture(
                    agent_type, session_id, self
                )
    
    def unregister_websocket(self, session_id: str):
        """Unregister a WebSocket connection"""
        if session_id in self.connections:
            del self.connections[session_id]
        
        # Clean up old session data (keep logs for a while)
        # Could implement cleanup after some time
    
    def get_log_capture(self, session_id: str, agent_type: AgentType) -> LogStreamCapture:
        """Get log capture for specific session and agent"""
        if session_id not in self.log_captures:
            self.register_websocket(session_id, None)  # Initialize without WebSocket
        
        return self.log_captures[session_id][agent_type]
    
    async def stream_log(self, session_id: str, log_entry: StreamingLog):
        """Stream a log entry to the connected WebSocket"""
        # Add to session logs
        if session_id in self.session_logs:
            self.session_logs[session_id][log_entry.agent].append(log_entry)
        
        # Stream to WebSocket if connected
        if session_id in self.connections and self.connections[session_id]:
            try:
                message = LogStreamingMessage(
                    session_id=session_id,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    log=log_entry
                )
                
                await self.connections[session_id].send_text(
                    json.dumps(message.model_dump())
                )
            except Exception as e:
                print(f"Error streaming log: {e}")
    
    async def stream_progress(self, session_id: str, stage: str, progress: float, message: str):
        """Stream progress update"""
        if session_id in self.connections and self.connections[session_id]:
            try:
                progress_message = ProgressStreamingMessage(
                    session_id=session_id,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    stage=stage,
                    progress_percentage=progress,
                    message=message
                )
                
                await self.connections[session_id].send_text(
                    json.dumps(progress_message.model_dump())
                )
            except Exception as e:
                print(f"Error streaming progress: {e}")
    
    async def stream_final_result(self, session_id: str, result):
        """Stream final appraisal result"""
        if session_id in self.connections and self.connections[session_id]:
            try:
                from consensus_api_models import FinalResultStreamingMessage
                
                final_message = FinalResultStreamingMessage(
                    session_id=session_id,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    result=result
                )
                
                await self.connections[session_id].send_text(
                    json.dumps(final_message.model_dump())
                )
            except Exception as e:
                print(f"Error streaming final result: {e}")
    
    def get_session_logs(self, session_id: str) -> Dict[AgentType, List[StreamingLog]]:
        """Get all logs for a session"""
        return self.session_logs.get(session_id, {})
    
    def cleanup_session(self, session_id: str):
        """Clean up session data"""
        if session_id in self.connections:
            del self.connections[session_id]
        if session_id in self.session_logs:
            del self.session_logs[session_id]
        if session_id in self.log_captures:
            del self.log_captures[session_id]
        if session_id in self.session_progress:
            del self.session_progress[session_id]

# Global log stream manager instance
global_log_stream_manager = LogStreamManager()

class StreamingLogContext:
    """Context manager for streaming logs during agent processing"""
    
    def __init__(self, session_id: str, agent_type: AgentType, operation_name: str):
        self.session_id = session_id
        self.agent_type = agent_type
        self.operation_name = operation_name
        self.log_capture = global_log_stream_manager.get_log_capture(session_id, agent_type)
        self.start_time = None
    
    async def __aenter__(self):
        self.start_time = time.time()
        self.log_capture.info(f"🚀 Starting {self.operation_name}...")
        return self.log_capture
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        duration = int((time.time() - self.start_time) * 1000)
        
        if exc_type:
            self.log_capture.error(f"❌ {self.operation_name} failed: {str(exc_val)}")
        else:
            self.log_capture.info(f"✅ {self.operation_name} completed ({duration}ms)")

# Helper functions for easy log streaming

async def stream_agent_log(session_id: str, agent_type: AgentType, level: LogLevel, message: str, metadata: Optional[Dict[str, Any]] = None):
    """Helper function to stream a log from an agent"""
    log_capture = global_log_stream_manager.get_log_capture(session_id, agent_type)
    log_capture.capture_log(level, message, metadata)

async def stream_progress_update(session_id: str, stage: str, progress: float, message: str):
    """Helper function to stream progress update"""
    await global_log_stream_manager.stream_progress(session_id, stage, progress, message)

async def stream_consensus_log(session_id: str, message: str, level: LogLevel = LogLevel.INFO):
    """Helper function for consensus agent logs"""
    await stream_agent_log(session_id, AgentType.CONSENSUS, level, message)

# Integration with existing logger
class UAgentLogHandler(logging.Handler):
    """Custom logging handler that integrates with uAgent logging"""
    
    def __init__(self, session_id: str, agent_type: AgentType):
        super().__init__()
        self.session_id = session_id
        self.agent_type = agent_type
        self.log_capture = global_log_stream_manager.get_log_capture(session_id, agent_type)
    
    def emit(self, record):
        """Emit a log record"""
        try:
            # Map Python logging levels to our LogLevel enum
            level_map = {
                logging.DEBUG: LogLevel.DEBUG,
                logging.INFO: LogLevel.INFO,
                logging.WARNING: LogLevel.WARNING,
                logging.ERROR: LogLevel.ERROR,
                logging.CRITICAL: LogLevel.ERROR
            }
            
            level = level_map.get(record.levelno, LogLevel.INFO)
            message = self.format(record)
            
            # Capture the log
            self.log_capture.capture_log(level, message)
            
        except Exception:
            self.handleError(record)

def setup_agent_logging(session_id: str, agent_type: AgentType, logger: logging.Logger):
    """Setup streaming logging for an agent"""
    handler = UAgentLogHandler(session_id, agent_type)
    handler.setFormatter(logging.Formatter('%(message)s'))
    logger.addHandler(handler)
    return handler
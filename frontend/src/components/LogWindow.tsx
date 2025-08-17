import React, { useEffect, useRef } from 'react';
import type { StreamingLog, LogLevel } from '../types/appraisal';
import { getLogLevelColor } from '../services/appraisalApi';

interface LogWindowProps {
  logs: StreamingLog[];
  isLoading?: boolean;
  height?: string;
  autoScroll?: boolean;
  showTimestamps?: boolean;
  className?: string;
}

const LogWindow: React.FC<LogWindowProps> = ({
  logs,
  isLoading = false,
  height = 'h-48',
  autoScroll = true,
  showTimestamps = false,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'debug':
        return '🔍';
      default:
        return '📝';
    }
  };

  const getLogLevelClass = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      case 'debug':
        return 'text-gray-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className={`relative ${height} ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center space-x-2 text-[#A3FFC8]">
            <div className="animate-spin h-4 w-4 border-2 border-[#A3FFC8] border-t-transparent rounded-full"></div>
            <span className="text-sm">Processing...</span>
          </div>
        </div>
      )}

      {/* Log container */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto bg-gray-900 rounded-lg p-3 font-mono text-xs leading-relaxed border border-gray-700"
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic text-center py-8">
            {isLoading ? 'Waiting for logs...' : 'No logs available'}
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 hover:bg-gray-800/50 px-2 py-1 rounded transition-colors ${getLogLevelClass(log.level)}`}
              >
                {/* Log level icon */}
                <span className="flex-shrink-0 mt-0.5 text-xs">
                  {getLogIcon(log.level)}
                </span>

                {/* Timestamp (optional) */}
                {showTimestamps && (
                  <span className="flex-shrink-0 text-gray-500 text-xs">
                    [{formatTimestamp(log.timestamp)}]
                  </span>
                )}

                {/* Log message */}
                <span className="flex-1 break-words">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Auto-scroll indicator */}
        {logs.length > 0 && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center space-x-1 text-gray-500 text-xs">
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
              <span>Live stream</span>
            </div>
          </div>
        )}
      </div>

      {/* Log count badge */}
      {logs.length > 0 && (
        <div className="absolute top-2 right-2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
          {logs.length} logs
        </div>
      )}
    </div>
  );
};

export default LogWindow;
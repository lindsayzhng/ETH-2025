import React from 'react';
import type { AgentType, AgentPricingAnalysis, StreamingLog } from '../types/appraisal';
import { 
  getAgentDisplayName, 
  getAgentColor, 
  formatPrice, 
  formatConfidence,
  formatProcessingTime 
} from '../services/appraisalApi';
import LogWindow from './LogWindow';

interface AgentCardProps {
  agentType: AgentType;
  logs: StreamingLog[];
  analysis?: AgentPricingAnalysis;
  isProcessing: boolean;
  className?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agentType,
  logs,
  analysis,
  isProcessing,
  className = '',
}) => {
  const agentName = getAgentDisplayName(agentType);
  const agentColor = getAgentColor(agentType);

  // Determine status
  const getStatus = () => {
    if (analysis) return 'completed';
    if (logs.length > 0) return 'processing';
    if (isProcessing) return 'waiting';
    return 'idle';
  };

  const status = getStatus();

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '🔄';
      case 'waiting':
        return '⏳';
      default:
        return '⚪';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-blue-400';
      case 'waiting':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Analysis Complete';
      case 'processing':
        return 'Analyzing...';
      case 'waiting':
        return 'Waiting to start...';
      default:
        return 'Ready';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: agentColor }}
          />
          <h3 className="font-semibold text-[#A3FFC8]">{agentName}</h3>
        </div>
        
        <div className={`flex items-center space-x-1 text-sm ${getStatusColor()}`}>
          <span>{getStatusIcon()}</span>
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Price</div>
              <div className="text-lg font-bold text-[#A3FFC8]">
                {formatPrice(analysis.priceEth, analysis.priceUsd).eth}
              </div>
              {analysis.priceUsd && (
                <div className="text-xs text-gray-400">
                  {formatPrice(analysis.priceEth, analysis.priceUsd).usd}
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Confidence</div>
              <div className="text-lg font-bold text-[#A3FFC8]">
                {formatConfidence(analysis.confidence)}
              </div>
              <div className="text-xs text-gray-400">
                {formatProcessingTime(analysis.processingTimeMs)}
              </div>
            </div>
          </div>

          {/* Reasoning snippet */}
          <div className="text-sm text-gray-300">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Reasoning</div>
            <div className="line-clamp-3">
              {analysis.reasoning}
            </div>
          </div>

          {/* Traits analyzed */}
          {analysis.traitsAnalyzed.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Traits Analyzed</div>
              <div className="flex flex-wrap gap-1">
                {analysis.traitsAnalyzed.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-300"
                  >
                    {trait.traitType}: {trait.value}
                    {trait.rarityPercentage && (
                      <span className="ml-1 text-[#A3FFC8]">
                        ({trait.rarityPercentage.toFixed(1)}%)
                      </span>
                    )}
                  </span>
                ))}
                {analysis.traitsAnalyzed.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-400">
                    +{analysis.traitsAnalyzed.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Logs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-300">Live Analysis</h4>
          {logs.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span>Streaming</span>
            </div>
          )}
        </div>
        
        <LogWindow
          logs={logs}
          isLoading={isProcessing && logs.length === 0}
          height="h-40"
          autoScroll={true}
          showTimestamps={false}
        />
      </div>

      {/* Error handling */}
      {analysis && !analysis.success && (
        <div className="mt-3 p-2 bg-red-900/50 border border-red-700 rounded text-red-300 text-sm">
          <div className="font-medium">Analysis Failed</div>
          <div className="text-xs text-red-400 mt-1">
            {analysis.errorMessage || 'Unknown error occurred'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCard;
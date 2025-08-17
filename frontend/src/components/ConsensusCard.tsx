import React from 'react';
import type { ConsensusAnalysis, StreamingLog, AgentType } from '../types/appraisal';
import { formatPrice, formatConfidence } from '../services/appraisalApi';
import LogWindow from './LogWindow';

interface ConsensusCardProps {
  consensus?: ConsensusAnalysis;
  consensusLogs: StreamingLog[];
  participatingAgents: AgentType[];
  isProcessing: boolean;
  className?: string;
}

const ConsensusCard: React.FC<ConsensusCardProps> = ({
  consensus,
  consensusLogs,
  participatingAgents,
  isProcessing,
  className = '',
}) => {
  const getStatus = () => {
    if (consensus) return 'completed';
    if (consensusLogs.length > 0) return 'building';
    if (isProcessing) return 'waiting';
    return 'idle';
  };

  const status = getStatus();

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '🎯';
      case 'building':
        return '🔮';
      case 'waiting':
        return '⏳';
      default:
        return '🤖';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Consensus Reached';
      case 'building':
        return 'Building Consensus...';
      case 'waiting':
        return 'Waiting for Agents...';
      default:
        return 'Ready for Analysis';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'building':
        return 'text-blue-400';
      case 'waiting':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getStatusIcon()}</span>
          <h2 className="text-xl font-bold text-[#A3FFC8]">Consensus Analysis</h2>
        </div>
        
        <div className={`flex items-center space-x-2 text-sm ${getStatusColor()}`}>
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* Consensus Results */}
      {consensus && (
        <div className="space-y-6">
          {/* Main Price Display */}
          <div className="text-center p-6 bg-gray-700 rounded-lg border-2 border-[#A3FFC8]/30">
            <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              Final Consensus Price
            </div>
            <div className="text-4xl font-bold text-[#A3FFC8] mb-2">
              {consensus.consensusPriceEth.toFixed(3)} ETH
            </div>
            <div className="text-lg text-gray-300">
              {formatPrice(consensus.consensusPriceEth).usd}
            </div>
          </div>

          {/* Consensus Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Confidence
              </div>
              <div className="text-lg font-bold text-[#A3FFC8]">
                {formatConfidence(consensus.confidenceScore)}
              </div>
            </div>

            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Price Range
              </div>
              <div className="text-sm font-medium text-gray-300">
                {consensus.metrics.priceRangeMin.toFixed(2)} - {consensus.metrics.priceRangeMax.toFixed(2)} ETH
              </div>
            </div>

            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Variance
              </div>
              <div className="text-lg font-bold text-gray-300">
                {consensus.metrics.coefficientOfVariation.toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Consensus
              </div>
              <div className="text-lg font-bold">
                {consensus.strongConsensus ? (
                  <span className="text-green-400">Strong</span>
                ) : (
                  <span className="text-yellow-400">Moderate</span>
                )}
              </div>
            </div>
          </div>

          {/* Consensus Reasoning */}
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-[#A3FFC8] mb-3">
              Consensus Reasoning
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {consensus.consensusReasoning}
            </p>
          </div>

          {/* Market Positioning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-[#A3FFC8] mb-3">
                Market Positioning
              </h4>
              <p className="text-sm text-gray-300">
                {consensus.marketPositioning}
              </p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-[#A3FFC8] mb-3">
                Risk Assessment
              </h4>
              <p className="text-sm text-gray-300">
                {consensus.riskAssessment}
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Outliers
              </div>
              <div className="text-gray-300">
                {consensus.outliersDetected.length > 0 
                  ? consensus.outliersDetected.join(', ')
                  : 'None detected'
                }
              </div>
            </div>

            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Challenges
              </div>
              <div className="text-gray-300">
                {consensus.challengesIssued} issued
              </div>
            </div>

            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                MeTTa Confidence
              </div>
              <div className="text-gray-300">
                {formatConfidence(consensus.symbolicConfidence)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Consensus Building Logs */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-300">
            Consensus Building Process
          </h4>
          {consensusLogs.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              <span>MeTTa + ASI:One</span>
            </div>
          )}
        </div>
        
        <LogWindow
          logs={consensusLogs}
          isLoading={isProcessing && consensusLogs.length === 0}
          height="h-32"
          autoScroll={true}
          showTimestamps={false}
        />
      </div>

      {/* Participating Agents */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Participating Agents
        </div>
        <div className="flex space-x-2">
          {participatingAgents.map((agent) => (
            <span
              key={agent}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-300"
            >
              {agent.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsensusCard;
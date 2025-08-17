import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  stage: string;
  isComplete?: boolean;
  isError?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  stage,
  isComplete = false,
  isError = false,
  className = '',
}) => {
  const getProgressColor = () => {
    if (isError) return 'bg-red-500';
    if (isComplete) return 'bg-green-500';
    return 'bg-[#A3FFC8]';
  };

  const getStageIcon = () => {
    if (isError) return '❌';
    if (isComplete) return '✅';
    
    switch (stage) {
      case 'parsing':
        return '🧠';
      case 'agents':
        return '🤖';
      case 'consensus':
        return '🔮';
      case 'final':
        return '🎯';
      default:
        return '⚡';
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case 'parsing':
        return 'Parsing NFT query with ASI:One...';
      case 'agents':
        return 'Querying AI pricing agents...';
      case 'consensus':
        return 'Building consensus with MeTTa...';
      case 'final':
        return 'Finalizing analysis...';
      case 'connecting':
        return 'Connecting to consensus agent...';
      case 'starting':
        return 'Initiating appraisal process...';
      case 'completed':
        return 'Analysis complete!';
      case 'error':
        return 'Error occurred during analysis';
      default:
        return stage;
    }
  };

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full ${className}`}>
      {/* Progress info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStageIcon()}</span>
          <span className="text-sm font-medium text-gray-300">
            {getStageDescription()}
          </span>
        </div>
        
        <span className="text-sm text-gray-400">
          {clampedProgress.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-gray-700 rounded-full" />
        
        {/* Progress fill */}
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
          style={{ width: `${clampedProgress}%` }}
        />
        
        {/* Animated shimmer effect for active progress */}
        {!isComplete && !isError && clampedProgress > 0 && (
          <div
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
            style={{ 
              left: `${Math.max(0, clampedProgress - 8)}%`,
              animationDuration: '1.5s',
              animationIterationCount: 'infinite'
            }}
          />
        )}
      </div>

      {/* Stage milestones */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span className={progress >= 10 ? 'text-[#A3FFC8]' : ''}>Parse</span>
        <span className={progress >= 30 ? 'text-[#A3FFC8]' : ''}>Agents</span>
        <span className={progress >= 80 ? 'text-[#A3FFC8]' : ''}>Consensus</span>
        <span className={progress >= 100 ? 'text-[#A3FFC8]' : ''}>Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
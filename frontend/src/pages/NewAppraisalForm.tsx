import React, { useState } from "react";
import { Search, Zap, Globe, Hash } from "lucide-react";
import { useAppraisal } from "../hooks/useAppraisal";
import { type AgentType, AGENT_TYPES } from "../types/appraisal";
import { parseNaturalQuery } from "../services/appraisalApi";

// Components
import AgentCard from "../components/AgentCard";
import ConsensusCard from "../components/ConsensusCard";
import ProgressBar from "../components/ProgressBar";
import TextInput from "../components/textInput";
import Button from "../components/button";

const NewAppraisalForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    queryType: "natural" as "natural" | "structured",
    query: "",
    collectionName: "",
    tokenId: "",
    network: "ethereum",
  });

  // Appraisal hook
  const {
    state,
    startAppraisal,
    cancelAppraisal,
    reset,
    getAgentLogs,
    getAgentAnalysis,
    isConnected,
    isProcessing,
    error,
    currentStage,
    progressPercentage,
    appraisal,
    agentResults,
  } = useAppraisal({
    onComplete: (result) => {
      console.log("Appraisal completed:", result);
    },
    onError: (error) => {
      console.error("Appraisal error:", error);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing) {
      cancelAppraisal();
      return;
    }

    // Auto-fill structured fields from natural query if needed
    if (formData.queryType === "natural" && formData.query) {
      const parsed = parseNaturalQuery(formData.query);
      if (parsed.collection && parsed.tokenId) {
        setFormData((prev) => ({
          ...prev,
          collectionName: parsed.collection || "",
          tokenId: parsed.tokenId || "",
        }));
      }
    }

    await startAppraisal(formData);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Get connection status display
  const getConnectionStatus = () => {
    if (isProcessing && !isConnected) {
      return { text: "Connecting...", color: "text-yellow-400" };
    }
    if (isConnected) {
      return { text: "Connected", color: "text-green-400" };
    }
    return { text: "Ready", color: "text-gray-400" };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#A3FFC8] mb-2">
          🤖 Multi-Agent NFT Appraisal
        </h1>
        <p className="text-gray-400">
          Powered by OpenAI, Anthropic, Google Gemini + MeTTa Consensus
        </p>
      </div>

      {/* Query Form */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Query Type Toggle */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleInputChange("queryType", "natural")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                formData.queryType === "natural"
                  ? "bg-[#A3FFC8] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Natural Language</span>
            </button>

            <button
              type="button"
              onClick={() => handleInputChange("queryType", "structured")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                formData.queryType === "structured"
                  ? "bg-[#A3FFC8] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span>Structured</span>
            </button>
          </div>

          {/* Query Inputs */}
          {formData.queryType === "natural" ? (
            <div>
              <TextInput
                label="Natural Language Query"
                value={formData.query}
                onChange={(e) => handleInputChange("query", e.target.value)}
                placeholder="e.g., 'Price Pudgy Penguins #3532', 'Moonbirds #6023', or any NFT description"
              />
              <div className="mt-2 text-xs text-gray-400">
                💡 Tip: Accepts any text - collection names, token IDs, contract
                addresses, or natural language
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Collection Name"
                value={formData.collectionName}
                onChange={(e) =>
                  handleInputChange("collectionName", e.target.value)
                }
                placeholder="e.g., Pudgy Penguins"
              />

              <TextInput
                label="Token ID"
                value={formData.tokenId}
                onChange={(e) => handleInputChange("tokenId", e.target.value)}
                placeholder="e.g., 3532"
              />
            </div>
          )}

          {/* Network Selection */}
          <div className="flex items-center space-x-4">
            <Globe className="h-5 w-5 text-gray-400" />
            <select
              value={formData.network}
              onChange={(e) => handleInputChange("network", e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 focus:ring-2 focus:ring-[#A3FFC8] focus:border-transparent"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
            </select>
          </div>

          {/* Connection Status & Submit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              <span className={`text-sm ${connectionStatus.color}`}>
                {connectionStatus.text}
              </span>
            </div>

            <Button
              type="submit"
              variant="outlined"
              disabled={
                !formData.query &&
                (!formData.collectionName || !formData.tokenId)
              }
              className="min-w-[120px]"
            >
              <span className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>{isProcessing ? "Cancel" : "Appraise NFT"}</span>
              </span>
            </Button>
          </div>
        </form>
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <ProgressBar
          progress={progressPercentage}
          stage={currentStage}
          isComplete={appraisal?.success === true}
          isError={!!error}
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">❌</span>
            <span className="text-red-300 font-medium">Error</span>
          </div>
          <p className="text-red-200 mt-2">{error}</p>
          <button
            onClick={reset}
            className="mt-3 text-sm text-red-300 hover:text-red-200 underline"
          >
            Reset and try again
          </button>
        </div>
      )}

      {/* Results Section */}
      {(isProcessing || appraisal) && (
        <div className="space-y-8">
          {/* Agent Analysis Cards */}
          <div>
            <h2 className="text-xl font-bold text-[#A3FFC8] mb-4">
              🤖 Agent Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {AGENT_TYPES.filter((type) => type !== "consensus").map(
                (agentType) => (
                  <AgentCard
                    key={agentType}
                    agentType={agentType}
                    logs={getAgentLogs(agentType)}
                    analysis={getAgentAnalysis(agentType)}
                    isProcessing={isProcessing}
                  />
                )
              )}
            </div>
          </div>

          {/* Consensus Analysis */}
          <div>
            <h2 className="text-xl font-bold text-[#A3FFC8] mb-4">
              🎯 Consensus Analysis
            </h2>
            <ConsensusCard
              consensus={appraisal?.consensus}
              consensusLogs={getAgentLogs("consensus")}
              participatingAgents={Object.keys(agentResults) as AgentType[]}
              isProcessing={isProcessing}
            />
          </div>

          {/* NFT Details */}
          {appraisal?.nftIdentity && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#A3FFC8] mb-4">
                NFT Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Collection</div>
                  <div className="text-gray-300">
                    {appraisal.nftIdentity.collectionName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Token ID</div>
                  <div className="text-gray-300">
                    #{appraisal.nftIdentity.tokenId}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Network</div>
                  <div className="text-gray-300 capitalize">
                    {appraisal.nftIdentity.network}
                  </div>
                </div>
                {appraisal.nftIdentity.openseaUrl && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">OpenSea</div>
                    <a
                      href={appraisal.nftIdentity.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A3FFC8] hover:underline"
                    >
                      View on OpenSea
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Processing Metadata */}
          {appraisal?.processing && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#A3FFC8] mb-4">
                Processing Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Total Time</div>
                  <div className="text-gray-300">
                    {(
                      appraisal.processing.totalProcessingTimeMs / 1000
                    ).toFixed(1)}
                    s
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Agents Queried</div>
                  <div className="text-gray-300">
                    {appraisal.processing.agentsQueried}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Responses</div>
                  <div className="text-gray-300">
                    {appraisal.processing.agentsResponded}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Method</div>
                  <div className="text-gray-300 text-xs">
                    {appraisal.processing.consensusMethod.split("+")[0]}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewAppraisalForm;

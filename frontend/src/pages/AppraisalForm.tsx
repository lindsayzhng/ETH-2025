import React, { useState } from "react";
import { Search } from "lucide-react";

// ✅ FIX: point to local files in the same folder
import { fetchAppraisal } from "../mock-data/server";
import type { AppraisalRequest, AppraisalResponse } from "../mock-data/types";
import NftTraits from "../components/nftTraits"; // after we patch traits to be dependency-free

import TextInput from "../components/textInput";
import Loading from "../components/loading"; // after we patch loading to be dependency-free
import Button from "../components/button";
import NftInfo from "../components/nftInfo";

const AppraisalForm: React.FC = () => {
  const [contractAddr, setContractAddr] = useState("");
  const [result, setResult] = useState<Partial<AppraisalResponse> | null>(null);
  const [metadataLoading, setMetadataLoading] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSell = () => {
    if (result) {
      const openSeaUrl = `https://opensea.io/assets/ethereum/${contractAddr}`;
      window.open(openSeaUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMetadataLoading(true);
    setModelsLoading(true);
    setError(null);
    setResult(null);
    try {
      const req: AppraisalRequest = { contractAddr };
      const fullData = await fetchAppraisal(req);

      // Simulate separate fetches: Set metadata immediately, delay models for realism
      setResult({
        nftMetadata: fullData.nftMetadata,
        marketPosition: fullData.marketPosition,
        rarityScore: fullData.rarityScore,
      });
      setMetadataLoading(false);

      // Artificial delay for chatbot models (in real app, this would be a separate async call)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay for models
      setResult(fullData);
      setModelsLoading(false);
    } catch (err) {
      setError("Failed to fetch appraisal. Check inputs or try again.");
      setMetadataLoading(false);
      setModelsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-xl shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] items-end gap-3"
      >
        <div className="min-w-0">
          <TextInput
            label="Contract Address"
            value={contractAddr}
            onChange={(e) => setContractAddr(e.target.value)}
          />
        </div>

        <div className="sm:justify-self-start">
          <Button
            variant="outlined"
            type="submit"
            disabled={metadataLoading || modelsLoading}
            aria-busy={metadataLoading || modelsLoading}
            className="justify-start text-left" // ⬅️ left-align contents inside the button
          >
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>
                {metadataLoading || modelsLoading
                  ? "Appraising..."
                  : "Appraise NFT"}
              </span>
            </span>
          </Button>
        </div>
      </form>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <section className="h-full flex flex-col items-center bg-gray-800 rounded-lg p-6 space-y-6 shadow-md">
            <h2 className="text-xl font-bold text-[#A3FFC8] text-center">
              NFT Stats
            </h2>

            {metadataLoading ? (
              <Loading />
            ) : (
              <>
                <NftInfo
                  imageUrl={result.nftMetadata?.imageUrl ?? ""}
                  name={result.nftMetadata?.name ?? ""}
                />
                <div className="w-full rounded-lg bg-gray-700 p-4">
                  <NftTraits
                    traits={result.nftMetadata?.traits ?? []}
                    maxVisible={10}
                  />
                </div>
              </>
            )}
          </section>

          <section className="h-full min-w-0 flex flex-col gap-6 bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="w-full rounded-lg bg-gray-700 p-4">
              <h4 className="font-semibold mb-3 text-[#A3FFC8]">
                Model Breakdown
              </h4>
              {modelsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loading />
                </div>
              ) : (
                <ul className="space-y-2">
                  {result.appraisedValue?.modelBreakdown?.map(
                    (model, index) => (
                      <li
                        key={index}
                        className="rounded-xl bg-gray-900 p-3 hover:shadow-md transition-shadow border border-gray-700"
                      >
                        <p className="font-medium text-[#A3FFC8]">
                          {model.model}: {model.valueEth} ETH
                        </p>
                        <p className="text-sm text-gray-400">
                          {model.explanation}
                        </p>
                      </li>
                    )
                  ) ?? (
                    <p className="text-gray-400">No model data available.</p>
                  )}
                </ul>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full rounded-lg bg-gray-700 p-4">
              <h4 className="font-semibold mb-3 text-[#A3FFC8]">Final Stats</h4>
              {metadataLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loading />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <Stat
                      label="Estimated ETH"
                      value={`${(
                        result.appraisedValue?.estimatedEth ?? 0
                      ).toFixed(2)} ETH`}
                    />
                    <Stat
                      label="Confidence"
                      value={`${toPercent(
                        result.appraisedValue?.confidence ?? 0
                      ).toFixed(0)}%`}
                    />
                    <Stat
                      label="Rarity Score"
                      value={(result.rarityScore ?? 0).toFixed(2)}
                    />
                    <Stat
                      label="Floor Price"
                      value={`${(
                        result.marketPosition?.floorPriceEth ?? 0
                      ).toFixed(2)} ETH`}
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <Button
                  variant="outlined"
                  onClick={handleSell}
                  disabled={!result?.nftMetadata?.imageUrl}
                  className="w-full"
                >
                  Sell on OpenSea
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-gray-800 p-4 text-center shadow-sm border border-gray-700">
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[#A3FFC8]">{value}</p>
    </div>
  );
}

const toPercent = (n: number) => {
  if (!Number.isFinite(n)) return 0;
  // Accept either fraction (0..1) or percent (0..100)
  return n > 1 ? n : n * 100;
};

export default AppraisalForm;

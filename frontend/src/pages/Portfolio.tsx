import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { getUserAppraisals } from "../services/api"; // From earlier (Supabase fetch)
import type { AppraisalResponse } from "../mock-data/types"; // Your type
import { mockAppraisalResponse } from "../mock-data/data"; // For fallback
import Button from "../components/button"; // Your custom Button
import Loading from "../components/loading"; // Your custom Loading component

const Portfolio: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [appraisals, setAppraisals] = useState<AppraisalResponse[]>([]);
  const [projectedWorth, setProjectedWorth] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !address) return;

    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      try {
        const { appraisals: fetchedAppraisals, projectedWorth: worth } =
          await getUserAppraisals(address);
        setAppraisals(fetchedAppraisals || []);
        setProjectedWorth(worth);
      } catch (err) {
        setError("Failed to load portfolio. Using mock data.");
        // Fallback to mocks (remove in production)
        setAppraisals([mockAppraisalResponse, mockAppraisalResponse]); // Example multiples
        setProjectedWorth(2.0); // Mock sum
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="p-6 text-gray-300">
        Connect your wallet to view portfolio.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen text-gray-300">
      <h1 className="text-3xl font-bold text-[#A3FFC8] mb-6">Your Portfolio</h1>

      {/* Wallet Summary */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 space-y-4">
        <p className="text-lg">
          Wallet Address:{" "}
          <span className="font-mono text-[#A3FFC8]">{address}</span>
        </p>
        <p>
          Balance:{" "}
          <span className="text-[#A3FFC8]">
            {balance?.formatted || "0"} ETH
          </span>
        </p>
        <p className="text-xl font-semibold">
          Projected Total Worth:{" "}
          <span className="text-[#A3FFC8]">
            {projectedWorth.toFixed(2)} ETH
          </span>
        </p>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          className="w-full md:w-auto"
        >
          Refresh Portfolio
        </Button>
      </div>

      {/* Error/Loading */}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading ? (
        <div>
          <p className="text-center">Loading portfolio...</p>
          <Loading />
        </div>
      ) : appraisals.length === 0 ? (
        <p className="text-center">
          No NFTs found in your portfolio. Appraise some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appraisals.map((nft, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={nft.nftMetadata.imageUrl}
                alt={nft.nftMetadata.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-[#A3FFC8]">
                  {nft.nftMetadata.name}
                </h3>
                <p className="text-sm">
                  Value: {nft.appraisedValue.estimatedEth} ETH
                </p>
                <p className="text-sm">Rarity: {nft.rarityScore}/100</p>
                <div className="text-xs space-y-1">
                  <h4 className="font-medium">Traits:</h4>
                  <ul className="list-disc pl-4">
                    {nft.nftMetadata.traits.slice(0, 3).map(
                      (
                        trait,
                        tIndex // Limit to 3 for brevity
                      ) => (
                        <li key={tIndex}>
                          {trait.traitType}: {trait.value} (
                          {(trait.rarity * 100).toFixed(1)}%)
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;

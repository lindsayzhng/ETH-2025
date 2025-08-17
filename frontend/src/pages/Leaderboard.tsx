import React, { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient"; // Assuming your Supabase client from earlier setup
import Button from "../components/button"; // Your custom Button
import Loading from "../components/loading"; // Your custom Loading component (if exists, else replace with text)

interface PortfolioEntry {
  wallet_address: string;
  projected_worth: number;
  nft_count: number;
}

const Leaderboard: React.FC = () => {
  const [topPortfolios, setTopPortfolios] = useState<PortfolioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPortfolios = async () => {
      setLoading(true);
      setError(null);
      try {
        // Supabase query to get top 10 wallets by projected worth
        // Assumes a view or direct query; adjust if you have a different schema
        const { data, error: queryError } = await supabase.rpc(
          "get_top_portfolios",
          { limit_count: 10 }
        ); // Use a custom SQL function (see notes below)

        if (queryError) throw queryError;

        setTopPortfolios(data || []);
      } catch (err) {
        setError("Failed to load leaderboard.");
        // Mock fallback for dev (remove in production)
        setTopPortfolios([
          {
            wallet_address: "0x123...abc",
            projected_worth: 100.5,
            nft_count: 15,
          },
          {
            wallet_address: "0xdef...456",
            projected_worth: 85.2,
            nft_count: 10,
          },
          // ... add more mocks up to 10
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPortfolios();
  }, []);

  return (
    <div className="p-6 min-h-screen text-gray-300">
      <h1 className="text-3xl font-bold text-[#A3FFC8] mb-6">
        Leaderboard - Top 10 Portfolios
      </h1>

      {/* Error/Loading */}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading ? (
        <div className="text-center">
          <p>Loading leaderboard...</p>
          <Loading />
        </div>
      ) : topPortfolios.length === 0 ? (
        <p className="text-center">No portfolios found.</p>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-[#A3FFC8]">Rank</th>
                <th className="px-6 py-3 text-left text-[#A3FFC8]">Wallet</th>
                <th className="px-6 py-3 text-left text-[#A3FFC8]">
                  Projected Worth (ETH)
                </th>
                <th className="px-6 py-3 text-left text-[#A3FFC8]">
                  NFT Count
                </th>
              </tr>
            </thead>
            <tbody>
              {topPortfolios.map((entry, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">#{index + 1}</td>
                  <td className="px-6 py-4 font-mono">
                    {entry.wallet_address.slice(0, 6)}...
                    {entry.wallet_address.slice(-4)}
                  </td>
                  <td className="px-6 py-4 text-[#A3FFC8]">
                    {entry.projected_worth.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{entry.nft_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          className="w-full md:w-auto"
        >
          Refresh Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;

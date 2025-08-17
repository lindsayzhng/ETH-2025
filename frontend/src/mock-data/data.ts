import type { AppraisalResponse } from "./types";

export const mockAppraisalResponse: AppraisalResponse = {
  nftMetadata: {
    name: "Dave Starbelly",
    imageUrl:
      "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    traits: [
      { traitType: "Collection name", value: "Baluga boy" },
      {
        traitType: "Collection address",
        value: "0xe9324223h3dx9932vacac00002d2c",
      },
      { traitType: "Token ID", value: "7261" },
      { traitType: "Owner", value: "0x553j2ddwd9d9d992b23hfbk2j32e2r323" },
    ],
  },
  salesHistory: [
    // Inspired by OpenSea events API (e.g., successful sales events with transaction details)
    { date: "2025-07-15T12:00:00Z", priceEth: 0.5, usdValue: 1000 },
    { date: "2025-06-20T15:30:00Z", priceEth: 0.45, usdValue: 900 },
    { date: "2025-05-10T09:45:00Z", priceEth: 0.6, usdValue: 1200 },
    { date: "2025-04-05T18:20:00Z", priceEth: 0.4, usdValue: 800 },
  ],
  rarityScore: 92, // Aggregated score (e.g., from trait rarities, as OpenSea calculates via their rarity model)
  marketPosition: {
    // Inspired by collection stats API (floor, avg, volume)
    floorPriceEth: 0.3,
    avgPriceEth: 0.5,
    volume24h: 50, // In ETH
  },
  appraisedValue: {
    estimatedEth: 0.55, // Consensus from models
    confidence: 0.88,
    modelBreakdown: [
      {
        model: "Claude",
        valueEth: 0.6,
        explanation: "High rarity in key traits like Aqua Power",
        weight: 0.4,
      },
      {
        model: "Gemini",
        valueEth: 0.5,
        explanation: "Recent sales trend upward",
        weight: 0.3,
      },
      {
        model: "Llama",
        valueEth: 0.55,
        explanation: "Strong market volume supports value",
        weight: 0.3,
      },
    ],
  },
  consensusMethod: "Shapley-weighted",
};

export interface AppraisalRequest {
  contractAddr: string; // e.g., "0x1234..."
}

export interface AppraisalResponse {
  nftMetadata: {
    name: string;
    imageUrl: string;
    traits: Array<{ traitType: string; value: string; rarity: number }>; // e.g., [{ traitType: "Background", value: "Blue", rarity: 0.15 }]
  };
  salesHistory: Array<{ date: string; priceEth: number; usdValue: number }>; // Last 10 sales
  rarityScore: number; // 0-100, based on traits
  marketPosition: {
    floorPriceEth: number;
    avgPriceEth: number;
    volume24h: number;
  };
  appraisedValue: {
    estimatedEth: number; // Consensus value
    confidence: number; // 0-1, based on model agreement
    modelBreakdown: Array<{
      model: string;
      valueEth: number;
      explanation: string;
      weight: number;
    }>; // e.g., [{ model: "Claude", valueEth: 1.2, explanation: "High rarity boosts value", weight: 0.4 }]
  };
  consensusMethod: string; // e.g., "Shapley-weighted (70% price consistency, 30% coherence)"
}

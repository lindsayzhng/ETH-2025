import { supabase } from "../libs/supabaseClient";
1;

// Insert Appraisal (e.g., after computing value in backend/frontend)
export const insertAppraisal = async (data: {
  wallet_id: number;
  nft_contract: string;
  nft_token_id: string;
  appraised_value_eth: number;
  rarity_score: number;
  metadata: object;
}) => {
  const { error } = await supabase.from("appraisals").insert(data);
  if (error) throw error;
};

// Fetch Appraisals and Compute Projected Worth
export const getUserAppraisals = async (walletAddress: string) => {
  const { data: wallet } = await supabase
    .from("wallets")
    .select("id")
    .eq("wallet_address", walletAddress)
    .single();
  if (!wallet) throw new Error("Wallet not found");

  const { data: appraisals } = await supabase
    .from("appraisals")
    .select("*")
    .eq("wallet_id", wallet.id);

  // Compute projected worth (sum of values)
  const projectedWorth =
    appraisals?.reduce((sum, item) => sum + item.appraised_value_eth, 0) || 0;

  return { appraisals, projectedWorth };
};

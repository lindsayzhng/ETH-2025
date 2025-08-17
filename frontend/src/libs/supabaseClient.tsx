import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bhbpomzfgdhepwfzmzrx.supabase.co"; // From dashboard
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoYnBvbXpmZ2RoZXB3ZnptenJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTQ4NjYsImV4cCI6MjA3MDk5MDg2Nn0.J8I0eZw2LW7_IlhK2sp0tMprTg0sOoc4QmkXGPKLzc8"; // From dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

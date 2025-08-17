import { useState } from "react";
import AppraisalForm from "./pages/AppraisalForm";
import "./App.css";
import { Sidebar } from "./components/sidebar";
import type { SidebarItem } from "./components/sidebar";
import Leaderboard from "./pages/Leaderboard";
import { User, Wallet, Scale, Trophy, Upload } from "lucide-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config"; // Your Wagmi config
import WalletConnection from "./pages/WalletConnection";
import DeployContract from "./pages/DeployContract";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

function AccountPage() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-[#A3FFC8]">Account Connected</h2>
      <p className="text-gray-300">
        Wallet Address:{" "}
        <span className="font-mono text-[#A3FFC8]">{address}</span>
      </p>
      <p className="text-gray-300">
        Balance:{" "}
        <span className="text-[#A3FFC8]">{balance?.formatted} ETH</span>
      </p>
      <p className="text-gray-300">
        You're now connected! Explore the app via the sidebar.
      </p>
    </div>
  );
}

function ProtectedLayout() {
  const { isConnected } = useAccount();
  const items: SidebarItem[] = [
    { label: "Account", href: "/account", icon: <User className="h-5 w-5" /> },
    {
      label: "Your Portfolio",
      href: "/portfolio",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      label: "Appraise",
      href: "/appraise",
      icon: <Scale className="h-5 w-5" />,
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      label: "Deploy Contract",
      href: "/deploy",
      icon: <Upload className="h-5 w-5" />,
    },
    // { label: "Chatbot", href: "/chatbot" },
  ];

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <Sidebar items={items} logo="MintCondition" defaultCollapsed={false}>
      <Outlet />
    </Sidebar>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<WalletConnection />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/account" element={<AccountPage />} />
              <Route path="/appraise" element={<AppraisalForm />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/deploy" element={<DeployContract />} />
              {/* <Route path="/chatbot" element={<div>Chatbot Page</div>} /> */}
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

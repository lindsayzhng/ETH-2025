import { useState } from "react";
import NewAppraisalForm from "./pages/NewAppraisalForm";
import "./App.css";
import { Sidebar } from "./components/sidebar";
import type { SidebarItem } from "./components/sidebar";
import Leaderboard from "./pages/Leaderboard";
import { Wallet, Scale, Trophy, LogOut } from "lucide-react";

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
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

function WalletInfo() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const shortBalance = balance?.formatted ? `${balance.formatted.slice(0, 6)} ETH` : '0 ETH';

  return [
    {
      label: (
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-mono text-[#A3FFC8] truncate">{shortAddress}</span>
            <span className="text-xs text-gray-300">{shortBalance}</span>
          </div>
        </div>
      ),
      icon: <Wallet className="h-5 w-5 text-[#A3FFC8]" />,
      onClick: () => {}
    },
    {
      label: "Disconnect",
      icon: <LogOut className="h-5 w-5 text-red-400" />,
      onClick: () => disconnect(),
      transparent: true
    }
  ];
}

function ProtectedLayout() {
  const { isConnected } = useAccount();
  const items: SidebarItem[] = [
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
    // { label: "Chatbot", href: "/chatbot" },
  ];

  const walletInfo = WalletInfo();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <Sidebar items={items} footerItems={walletInfo} logo="MintCondition" defaultCollapsed={false}>
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
              <Route path="/appraise" element={<NewAppraisalForm />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route index element={<Navigate to="/portfolio" replace />} />
              {/* <Route path="/chatbot" element={<div>Chatbot Page</div>} /> */}
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

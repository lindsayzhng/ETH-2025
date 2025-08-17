import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import Button from "../components/button"; // Your custom Button
import { useNavigate } from "react-router-dom";

const WalletConnection: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    if (isConnected) {
      navigate("/account");
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-[#A3FFC8] text-center">
          Connect Your Wallet
        </h1>
        <p className="text-gray-300 text-center">
          Connect to access NFT appraisal, portfolio, and more.
        </p>

        {isConnected ? (
          <div className="space-y-4 text-center">
            <p className="text-gray-300">
              Connected as:{" "}
              <span className="font-mono text-[#A3FFC8]">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </p>
            <p className="text-gray-300">
              Balance:{" "}
              <span className="text-[#A3FFC8]">{balance?.formatted} ETH</span>
            </p>
            <Button
              variant="secondary"
              onClick={() => disconnect()}
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                variant="primary"
                onClick={() => connect({ connector })}
                className="w-full"
              >
                Connect with {connector.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;

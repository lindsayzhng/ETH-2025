
import React, { useState } from 'react';
import { ethers } from 'ethers';
import  Button  from '../components/button';
import  Loading  from '../components/loading';
import { NFT_ABI, NFT_BYTECODE } from '../constants/nft';

const DeployContract: React.FC = () => {
  const [bytecode, setBytecode] = useState('');
  const [abi, setAbi] = useState<any[]>([]);
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const [minting, setMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState<string | null>(null);

  const handleGenerate = () => {
    setBytecode(NFT_BYTECODE);
    setAbi(NFT_ABI);
    setError(null);
    setContractAddress(null);
  };

  const handleDeploy = async () => {
    if (!bytecode || abi.length === 0) {
      setError('Please generate the contract details first.');
      return;
    }

    setDeploying(true);
    setError(null);
    setContractAddress(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed.');
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy();
      await contract.waitForDeployment();
      setContractAddress(await contract.getAddress());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setDeploying(false);
    }
  };

  const handleMint = async () => {
    if (!contractAddress) return;

    setMinting(true);
    setMintError(null);
    setMintSuccess(null);

    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed.');
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      
      const toAddress = await signer.getAddress();
      const tokenId = Date.now(); // Simple unique token ID

      const tx = await contract.safeMint(toAddress, tokenId);
      await tx.wait();
      
      setMintSuccess(`Successfully minted NFT with ID ${tokenId} to ${toAddress}. Transaction hash: ${tx.hash}`);

    } catch (err) {
      setMintError(err instanceof Error ? err.message : 'An unknown error occurred while minting.');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deploy Your Own NFT Contract</h1>
      <div className="space-y-4">
        <Button 
        variant='outlined'
        onClick={handleGenerate}>
          Generate NFT Contract Details
        </Button>
        {abi.length > 0 && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-green-400">Contract details generated. Ready to deploy.</p>
          </div>
        )}
        <Button 
        variant='outlined'
        onClick={handleDeploy} disabled={deploying || abi.length === 0}>
          {deploying ? <Loading /> : 'Deploy Contract'}
        </Button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {contractAddress && (
        <div className="mt-8">
          <div className="p-4 bg-green-900 rounded-lg">
            <p className="text-green-300">Contract deployed successfully!</p>
            <p className="font-mono text-white">Address: {contractAddress}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Mint an NFT</h2>
            <Button onClick={handleMint} disabled={minting}>
              {minting ? <Loading /> : 'Mint NFT'}
            </Button>
          </div>

          {mintError && <p className="text-red-500 mt-4">{mintError}</p>}
          {mintSuccess && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
                    <h3 className="text-lg font-bold text-green-400">Mint Successful!</h3>
                    <p className="mt-2 text-gray-300 break-words">{mintSuccess}</p>
                    <Button onClick={() => setMintSuccess(null)} className="mt-4">
                        Close
                    </Button>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeployContract;

import SimpleWallet from '@/components/SimpleWallet';
import { useState } from 'react';

const TestPage = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Secret Bid Gallery - Test Page</h1>
        
        <div className="bg-card p-6 rounded-lg border mb-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection Test</h2>
          <div className="space-y-4">
            <div>
              <strong>Connection Status:</strong> {walletAddress ? 'Connected' : 'Not Connected'}
            </div>
            <div>
              <strong>Address:</strong> {walletAddress || 'No address'}
            </div>
            <div>
              <SimpleWallet 
                onConnect={setWalletAddress}
                onDisconnect={() => setWalletAddress(null)}
              />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Configuration Info</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Chain ID:</strong> 11155111 (Sepolia)</div>
            <div><strong>Project ID:</strong> 2ec9743d0d0cd7fb94dee1a7e6d33475</div>
            <div><strong>App Name:</strong> Secret Bid Gallery</div>
            <div><strong>Web3 Available:</strong> {typeof window.ethereum !== 'undefined' ? 'Yes' : 'No'}</div>
            <div><strong>User Agent:</strong> {navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'}</div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border mt-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Current URL:</strong> {window.location.href}</div>
            <div><strong>Protocol:</strong> {window.location.protocol}</div>
            <div><strong>Host:</strong> {window.location.host}</div>
            <div><strong>Local Storage:</strong> {localStorage.getItem('walletAddress') ? 'Has saved address' : 'No saved address'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

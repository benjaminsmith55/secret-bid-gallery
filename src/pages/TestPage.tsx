import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const TestPage = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Secret Bid Gallery - Test Page</h1>
        
        <div className="bg-card p-6 rounded-lg border mb-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection Test</h2>
          <div className="space-y-4">
            <div>
              <strong>Connection Status:</strong> {isConnected ? 'Connected' : 'Not Connected'}
            </div>
            <div>
              <strong>Address:</strong> {address || 'No address'}
            </div>
            <div>
              <ConnectButton />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Configuration Info</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Chain ID:</strong> 11155111 (Sepolia)</div>
            <div><strong>Project ID:</strong> 2ec9743d0d0cd7fb94dee1a7e6d33475</div>
            <div><strong>App Name:</strong> Secret Bid Gallery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

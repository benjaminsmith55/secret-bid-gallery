import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface SimpleWalletConnectProps {
  onConnect: (address: string) => void;
}

export const SimpleWalletConnect = ({ onConnect }: SimpleWalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask or another Web3 wallet to continue.');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        onConnect(accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border/20 shadow-glow-primary">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Secret Bid Gallery
            </h1>
            <p className="text-muted-foreground">
              Connect your wallet to access the secure NFT bidding platform
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <Wallet className="w-6 h-6 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-encrypted mb-1" />
              <p className="text-xs text-muted-foreground">Encrypted</p>
            </div>
            <div className="text-center">
              <Zap className="w-6 h-6 mx-auto text-success mb-1" />
              <p className="text-xs text-muted-foreground">Private</p>
            </div>
          </div>

          <div className="w-full">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-primary-foreground font-medium py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your bids are encrypted using FHE until auction end
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

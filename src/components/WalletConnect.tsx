import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, Zap } from "lucide-react";

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {

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
              Connect your wallet to access encrypted NFT auctions
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
            <ConnectButton />
          </div>

          <p className="text-xs text-muted-foreground">
            Your bids are encrypted using FHE until auction end
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

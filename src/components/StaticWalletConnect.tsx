import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, Zap } from "lucide-react";

interface StaticWalletConnectProps {
  onConnect: (address: string) => void;
}

export const StaticWalletConnect = ({ onConnect }: StaticWalletConnectProps) => {
  const handleConnect = () => {
    // For demo purposes, use a mock address
    const mockAddress = "0x1234567890123456789012345678901234567890";
    onConnect(mockAddress);
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
              Demo Mode - No Wallet Required
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
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-primary-foreground font-medium py-3 px-4 rounded-lg flex items-center justify-center"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Enter Demo Mode
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            This is a demo version. All bids are simulated using FHE encryption.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

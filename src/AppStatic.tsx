import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StaticWalletConnect } from "@/components/StaticWalletConnect";
import AuctionGallery from "@/components/AuctionGallery";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import { useState } from "react";

const AppStatic = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const handleConnect = (address: string) => {
    setConnectedAddress(address);
  };

  if (!connectedAddress) {
    return <StaticWalletConnect onConnect={handleConnect} />;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-6 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Secret Bid Gallery
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The Future of Private NFT Auctions
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  <strong>Demo Mode:</strong> {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)} • 
                  All bids are simulated using FHE encryption
                </p>
              </div>
            </div>

            <AuctionGallery address={connectedAddress} />
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default AppStatic;

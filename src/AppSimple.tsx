import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleWalletConnect } from "@/components/SimpleWalletConnect";
import AuctionGallery from "@/components/AuctionGallery";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import { useState, useEffect } from "react";

const AppSimple = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  // Check for existing connection on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          
          if (accounts.length > 0) {
            setConnectedAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking existing connection:', error);
      } finally {
        setIsCheckingConnection(false);
      }
    };

    checkExistingConnection();
  }, []);

  const handleConnect = (address: string) => {
    setConnectedAddress(address);
  };

  // Show loading state while checking connection
  if (isCheckingConnection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-secondary">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking wallet connection...</p>
        </div>
      </div>
    );
  }

  if (!connectedAddress) {
    return <SimpleWalletConnect onConnect={handleConnect} />;
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
                  <strong>Connected:</strong> {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)} • 
                  All bids are encrypted using Fully Homomorphic Encryption (FHE)
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

export default AppSimple;

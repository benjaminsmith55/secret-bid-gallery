import { useAccount } from 'wagmi';
import { WalletConnect } from "@/components/WalletConnect";
import { AuctionGallery } from "@/components/AuctionGallery";
import { Header } from "@/components/Header";

const FullIndex = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    return <WalletConnect onConnect={() => {}} />;
  }

  return (
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
              <strong>Connected:</strong> {address.slice(0, 6)}...{address.slice(-4)} • 
              All bids are encrypted using Fully Homomorphic Encryption (FHE)
            </p>
          </div>
        </div>

        <AuctionGallery />
      </main>
    </div>
  );
};

export default FullIndex;

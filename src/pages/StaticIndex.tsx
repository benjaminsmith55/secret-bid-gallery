import { useState, useEffect } from 'react';
import StaticHeader from '@/components/StaticHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Clock, Eye, EyeOff, Zap } from 'lucide-react';

const StaticIndex = () => {
  const [nfts, setNfts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading NFTs
    setTimeout(() => {
      setNfts([
        {
          id: '1',
          name: 'Mystic Artwork #1',
          description: 'A beautiful encrypted artwork',
          imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
          currentBid: 0.5,
          reservePrice: 0.3,
          timeLeft: '2h 30m',
          bidCount: 5,
          isActive: true
        },
        {
          id: '2',
          name: 'Digital Dream #2',
          description: 'An encrypted digital masterpiece',
          imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
          currentBid: 1.2,
          reservePrice: 0.8,
          timeLeft: '1h 15m',
          bidCount: 12,
          isActive: true
        },
        {
          id: '3',
          name: 'Blockchain Art #3',
          description: 'Unique blockchain artwork',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
          currentBid: 0.8,
          reservePrice: 0.5,
          timeLeft: '3h 45m',
          bidCount: 8,
          isActive: true
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePlaceBid = (nftId: string) => {
    alert(`Demo: Placing bid on NFT ${nftId}. In production, this would use FHE encryption.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <StaticHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Secret Bid Gallery
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The Future of Private NFT Auctions
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Demo Mode:</strong> This is a demonstration of the Secret Bid Gallery interface. 
              All bids are encrypted using Fully Homomorphic Encryption (FHE) to ensure complete privacy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </Card>
            ))
          ) : (
            nfts?.map((nft) => (
              <Card key={nft.id} className="group relative overflow-hidden bg-crypto-surface border-crypto-muted hover:border-crypto-primary/50 transition-all duration-300 hover:shadow-encrypted">
                <div className="relative">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-crypto-primary/20 text-crypto-primary border-crypto-primary/30">
                      <Lock className="w-3 h-3 mr-1" />
                      Encrypted
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{nft.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{nft.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Bid</span>
                      <span className="font-semibold text-crypto-primary">{nft.currentBid} ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Reserve Price</span>
                      <span className="font-semibold">{nft.reservePrice} ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bids</span>
                      <span className="font-semibold">{nft.bidCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time Left</span>
                      <span className="font-semibold text-orange-500">{nft.timeLeft}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handlePlaceBid(nft.id)}
                    className="w-full bg-crypto-primary hover:bg-crypto-primary/90 text-crypto-primary-foreground"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Place Encrypted Bid
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-crypto-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse NFTs</h3>
              <p className="text-muted-foreground">Discover unique encrypted artworks and collectibles</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-crypto-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Encrypted Bidding</h3>
              <p className="text-muted-foreground">Your bids are encrypted using FHE technology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-crypto-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Win Privately</h3>
              <p className="text-muted-foreground">Only the highest bidder is revealed at auction end</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaticIndex;

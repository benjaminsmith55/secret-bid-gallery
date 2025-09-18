import AuctionCard from "./AuctionCard";
import { useActiveNFTs } from "@/hooks/useContract";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";

interface AuctionGalleryProps {
  address?: string;
}

const AuctionGallery = ({ address }: AuctionGalleryProps) => {
  const { data: nfts, isLoading, error } = useActiveNFTs();

  // Fallback data if contract data is not available
  const fallbackAuctions = [
    {
      id: "1",
      title: "Cosmic Cipher",
      artist: "NeoArtist",
      image: nft1,
      currentBid: "2.5 ETH",
      timeLeft: "2h 34m",
      status: "live" as const,
      isEncrypted: true,
      bidCount: 12,
      tokenId: 1
    },
    {
      id: "2", 
      title: "Cybernetic Dreams",
      artist: "DigitalMind",
      image: nft2,
      currentBid: "1.8 ETH",
      timeLeft: "45m",
      status: "ending" as const,
      isEncrypted: true,
      bidCount: 8,
      tokenId: 2
    },
    {
      id: "3",
      title: "Quantum Geometry",
      artist: "AbstractCrypto",
      image: nft3,
      currentBid: "3.2 ETH",
      timeLeft: "1d 5h",
      status: "live" as const,
      isEncrypted: true,
      bidCount: 15,
      tokenId: 3
    }
  ];

  // Use contract data if available, otherwise use fallback
  const auctions = nfts || fallbackAuctions;

  return (
    <section className="py-20 px-6" id="auctions">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Live Encrypted Auctions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bid on exclusive NFTs with complete privacy until auction close
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-crypto-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading auctions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading auctions. Using demo data.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} address={address} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to participate? Connect your wallet to start bidding.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-crypto-surface rounded-lg border border-crypto-primary/20">
            <span className="text-sm text-crypto-primary">
              🔒 All bids encrypted with AES-256
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuctionGallery;
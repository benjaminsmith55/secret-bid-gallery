import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Clock, Eye, EyeOff, Zap } from "lucide-react";
import { useSecretBidGallery } from "@/hooks/useContract";
import { useAccount } from "wagmi";

interface AuctionCardProps {
  id: string;
  title: string;
  artist: string;
  image: string;
  currentBid: string;
  timeLeft: string;
  status: "live" | "ending" | "ended";
  isEncrypted: boolean;
  bidCount: number;
  tokenId: number;
}

const AuctionCard = ({ 
  title, 
  artist, 
  image, 
  currentBid, 
  timeLeft, 
  status, 
  isEncrypted,
  bidCount,
  tokenId
}: AuctionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const { placeBid } = useSecretBidGallery();
  const { address, isConnected } = useAccount();

  const handlePlaceBid = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert("Please enter a valid bid amount");
      return;
    }

    try {
      // Generate a proof for the bid (simulated for demo)
      const timestamp = Date.now().toString();
      const inputProof = `${bidAmount}-${timestamp}-${address}`;
      
      await placeBid(tokenId, bidAmount, inputProof);
      alert("Encrypted bid placed successfully! Your bid is now private until auction end.");
      setBidAmount("");
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-crypto-surface border-crypto-muted hover:border-crypto-primary/50 transition-all duration-300 hover:shadow-encrypted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Encrypted overlay effect */}
        {isEncrypted && (
          <div className="absolute inset-0 bg-gradient-encrypted opacity-60 animate-encrypt">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-crypto-surface/90 backdrop-blur-sm rounded-lg p-3 border border-crypto-primary/30">
                <Lock className="w-6 h-6 text-crypto-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={status === "live" ? "default" : status === "ending" ? "destructive" : "secondary"}
            className={`
              ${status === "live" ? "bg-gradient-primary" : ""}
              ${status === "ending" ? "animate-glow-pulse" : ""}
            `}
          >
            {status === "live" && <Zap className="w-3 h-3 mr-1" />}
            {status === "ending" && <Clock className="w-3 h-3 mr-1" />}
            {status.toUpperCase()}
          </Badge>
        </div>

        {/* Encryption status */}
        <div className="absolute top-3 right-3">
          <div className="bg-crypto-surface/90 backdrop-blur-sm rounded-full p-2 border border-crypto-primary/30">
            {isEncrypted ? (
              <EyeOff className="w-4 h-4 text-crypto-primary" />
            ) : (
              <Eye className="w-4 h-4 text-crypto-accent" />
            )}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-crypto-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">by {artist}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {isEncrypted ? "Encrypted Bids" : "Current Bid"}
            </span>
            <span className="font-semibold">
              {isEncrypted ? `${bidCount} bids` : currentBid}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Time Left</span>
            <span className={`font-semibold ${status === "ending" ? "text-destructive" : ""}`}>
              {timeLeft}
            </span>
          </div>
        </div>

        {status !== "ended" && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Bid amount (ETH)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1 px-3 py-2 border border-crypto-muted rounded-md bg-crypto-surface text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                min="0"
                step="0.01"
              />
            </div>
            <Button 
              variant="bid" 
              className="w-full"
              onClick={handlePlaceBid}
              disabled={!isConnected}
            >
              {isConnected ? "Place Encrypted Bid" : "Connect Wallet to Bid"}
            </Button>
          </div>
        )}
        
        {status === "ended" && (
          <Button 
            variant="secondary" 
            className="w-full"
            disabled
          >
            Auction Ended
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AuctionCard;
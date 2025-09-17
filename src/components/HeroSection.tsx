import { Button } from "@/components/ui/enhanced-button";
import { ArrowDown, Shield, Eye, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-encrypted opacity-50"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-crypto-surface rounded-full border border-crypto-primary/20">
          <Shield className="w-4 h-4 text-crypto-primary" />
          <span className="text-sm text-crypto-primary font-medium">Encrypted Bidding Protocol</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Bid in Secret,
          </span>
          <br />
          <span className="text-foreground">
            Reveal at Close
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Revolutionary NFT auctions where bids remain encrypted until the auction ends. 
          No more last-second sniping, just fair and transparent bidding.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="encrypted" size="lg" className="min-w-48">
            <Eye className="w-5 h-5 mr-2" />
            Explore Auctions
          </Button>
          <Button variant="wallet" size="lg" className="min-w-48">
            Connect & Bid
          </Button>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-crypto-surface rounded-xl border border-crypto-muted">
            <Shield className="w-12 h-12 text-crypto-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Encrypted Bids</h3>
            <p className="text-muted-foreground text-sm">
              Your bids are cryptographically secured until auction closure
            </p>
          </div>
          <div className="p-6 bg-crypto-surface rounded-xl border border-crypto-muted">
            <Clock className="w-12 h-12 text-crypto-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fair Timing</h3>
            <p className="text-muted-foreground text-sm">
              No sniping possible - all bids revealed simultaneously
            </p>
          </div>
          <div className="p-6 bg-crypto-surface rounded-xl border border-crypto-muted">
            <Eye className="w-12 h-12 text-crypto-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Transparent Results</h3>
            <p className="text-muted-foreground text-sm">
              Full bid history revealed at auction end for transparency
            </p>
          </div>
        </div>

        <div className="mt-16">
          <ArrowDown className="w-6 h-6 text-crypto-primary mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
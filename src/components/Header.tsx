import { Lock, Layers } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-crypto-muted bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <div className="relative">
                <Layers className="w-5 h-5 text-primary-foreground" />
                <Lock className="w-3 h-3 text-primary-foreground absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Secret Bid Gallery
              </h1>
              <p className="text-xs text-muted-foreground">Encrypted NFT Bidding</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#auctions" className="text-foreground hover:text-crypto-primary transition-colors">
              Live Auctions
            </a>
            <a href="#gallery" className="text-foreground hover:text-crypto-primary transition-colors">
              Gallery
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-crypto-primary transition-colors">
              How It Works
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              Connected
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
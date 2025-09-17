import { Wallet, Clock, Eye, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Connect & Verify",
      description: "Connect your wallet and verify your identity to participate in encrypted auctions",
      step: "01"
    },
    {
      icon: Zap,
      title: "Place Encrypted Bid",
      description: "Submit your bid amount - it's immediately encrypted and hidden from all participants",
      step: "02"
    },
    {
      icon: Clock,
      title: "Auction Runs",
      description: "Auction continues with all bids remaining secret. No sniping, no last-minute anxiety",
      step: "03"
    },
    {
      icon: Eye,
      title: "Simultaneous Reveal",
      description: "When time expires, all bids are revealed simultaneously. Highest bidder wins",
      step: "04"
    }
  ];

  return (
    <section className="py-20 px-6 bg-crypto-surface/30" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">Encrypted Bidding</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A revolutionary approach to NFT auctions that ensures fairness and eliminates bid manipulation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center group">
                <div className="mb-6">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-crypto-accent rounded-full flex items-center justify-center text-xs font-bold text-background">
                      {step.step}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-crypto-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-crypto-primary to-transparent opacity-30"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-crypto-surface rounded-2xl border border-crypto-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Why Encrypted Bidding?
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-4">
                <h4 className="font-semibold mb-2 text-crypto-primary">No Sniping</h4>
                <p className="text-sm text-muted-foreground">
                  Traditional auctions suffer from last-second bidding. Our system eliminates this unfair advantage.
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 text-crypto-primary">True Price Discovery</h4>
                <p className="text-sm text-muted-foreground">
                  Bidders submit their maximum willingness to pay, leading to more accurate market pricing.
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 text-crypto-primary">Enhanced Privacy</h4>
                <p className="text-sm text-muted-foreground">
                  Your bidding strategy remains private until the auction concludes, preventing manipulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
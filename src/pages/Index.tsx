import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AuctionGallery from "@/components/AuctionGallery";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AuctionGallery />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Index;

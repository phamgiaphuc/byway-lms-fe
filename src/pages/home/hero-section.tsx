import { Button } from "@/components/ui/button";
import HeroBg from "@/assets/backgrounds/hero-bg.png";

const HeroSection = () => {
  return (
    <div className="mt-16 flex min-h-148 flex-col">
      <div className="container mx-auto flex flex-1 items-center justify-between px-5">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="max-w-[400px] text-4xl font-bold">Unlock Your Potential with Byway</h1>
            <p className="text-muted-foreground max-w-lg leading-6 tracking-wide">
              Welcome to Byway, where learning knows no bounds. We believe that education is the key
              to personal and professional growth, and we're here to guide you on your journey to
              success.
            </p>
          </div>
          <Button className="bg-[#1d4ed8] hover:bg-[#1d4ed8]/90">
            Start your instructor journey
          </Button>
        </div>
        <div>
          <img src={HeroBg} alt="Hero Background" className="hidden w-[550px] md:block" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

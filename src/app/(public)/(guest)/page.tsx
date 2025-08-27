import { Header } from "@/components/ui-custom/public/guest/home/Header";
import { HeroSection } from "@/components/ui-custom/public/guest/home/HeroSection";
import { FeaturesSection } from "@/components/ui-custom/public/guest/home/FeaturesSection";
import { HowItWorksSection } from "@/components/ui-custom/public/guest/home/HowItWorksSection";
import { CTASection } from "@/components/ui-custom/public/guest/home/CTASection";
import { Footer } from "@/components/ui-custom/public/guest/home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
}

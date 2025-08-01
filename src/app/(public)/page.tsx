import { Header } from "@/components/ui-custom/landingPage/Header";
import { HeroSection } from "@/components/ui-custom/landingPage/HeroSection";
import { FeaturesSection } from "@/components/ui-custom/landingPage/FeaturesSection";
import { HowItWorksSection } from "@/components/ui-custom/landingPage/HowItWorksSection";
import { CTASection } from "@/components/ui-custom/landingPage/CTASection";
import { Footer } from "@/components/ui-custom/landingPage/Footer";

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

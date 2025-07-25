import Image from "next/image";
import { Header } from "@/components/landingPage/Header";
import { HeroSection } from "@/components/landingPage/HeroSection";
import { FeaturesSection } from "@/components/landingPage/FeaturesSection";
import { HowItWorksSection } from "@/components/landingPage/HowItWorksSection";
import { CTASection } from "@/components/landingPage/CTASection";
import { Footer } from "@/components/landingPage/Footer";

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

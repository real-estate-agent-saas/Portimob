import React from "react";
import { Navigation } from "@/components/ui-custom/public/guest/home/navigation"
import { SwipeableBanner } from "@/components/ui-custom/public/guest/home/swipeable-banner"
import { FeatureCards } from "@/components/ui-custom/public/guest/home/feature-cards"

export default function Page() {
  return (
    <section className="w-full h-screen flex flex-col">
      
      <Navigation />
      
      <div className="flex-1">
        <SwipeableBanner />
      </div>
    
    </section>
  );
}
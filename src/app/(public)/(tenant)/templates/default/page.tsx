"use client"; // Necessary to get slug

// Components
import { FeaturedCarousel } from "@/components/ui-custom/public/tenant/default/layout/Carousel";

// Context to get the slug
import { useTenant } from "@/contexts/TenantContext";

export default function Home() {
  const userId = useTenant().userId;

  return (
    <div>
      <div>
        <FeaturedCarousel userId={userId} />
      </div>

      <section>
        <h1 className="text-center font-semibold text-4xl mt-10 text-[var(--navlink)]">
          Studios para morar ou investir
        </h1>
      </section>
    </div>
  );
}

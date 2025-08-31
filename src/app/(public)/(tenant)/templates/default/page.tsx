import { FeaturedCarousel } from "@/components/ui-custom/public/tenant/default/layout/Carousel";

export default function Home() {
  return (
    <div>
      <div>
        <FeaturedCarousel />
      </div>

      <section>
        <h1 className="text-center font-semibold text-4xl mt-10 text-[var(--navlink)]">
            Studios para morar ou investir
        </h1>        
      </section>
    </div>
  );
}

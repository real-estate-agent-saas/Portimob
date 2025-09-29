"use client"; // Necessary to get slug

// Components
import { FeaturedCarousel } from "@/components/ui-custom/public/tenant/default/home/Carousel";

// Context to get the slug
import { useTenant } from "@/lib/contexts/TenantContext";

export default function Home() {
  const userId = useTenant().userId;

  return (
    <div>
      {/* Carousel section with its message cards */}
      <section>
        <FeaturedCarousel userId={userId} />
        
        <div className="hidden w-full lg:flex justify-center 2xl:mt-[-30px] relative">
          <div className="flex justify-around w-full px-6 2xl:px-0 2xl:w-11/12 gap-4 2xl:gap-16 absolute mt-8 2xl:mt-0">
            <div className="flex-1 flex flex-col items-center justify-center px-3 h-[200px] rounded-3xl bg-white">
              <h2 className="font-semibold text-xl text-center">
                Trabalhamos com todos os segmentos
              </h2>
              <p className="text-center mt-6">
                Atuamos desde a linha econômica até o alto padrão e salas
                comerciais.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-3 h-[200px] rounded-3xl bg-white">
              <h2 className="font-semibold text-xl text-center">Acompanhamos você​</h2>
              <p className="text-center mt-6">
                Conte conosco para achar o apartamento dos seus sonhos.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-3 h-[200px] rounded-3xl bg-white">
              <h2 className="font-semibold text-xl text-center">Os melhores preços​</h2>
              <p className="text-center mt-6">
                Ajudamos você a encontrar o imóvel que cabe no seu bolso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--default-secondary-background)]">
        <div className="pt-16 lg:pt-96">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Studios para Morar ou Investir</h1>
            <p className="mt-4">Seu espaço moderno e rentável no coração de São Paulo</p>
          </div>
          <div className="w-full h-[600px] bg-slate-300">
            <p className="text-3xl font-bold flex justify-center">
              AQUI VEM UM CAROUSEL DE IMOVEIS
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/landingPage/hero-property.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-40"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Encontre seu <span className="primary-text">Imóvel dos Sonhos</span>
        </h1>

        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          A plataforma mais completa para comprar, vender e alugar imóveis.
          Conectamos você ao lar perfeito com tecnologia e confiança.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Cadastrar Imóvel
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            Explorar Imóveis
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-soft">
            <div className="text-3xl font-bold primary-text">10k+</div>
            <div className="text-sm text-muted-foreground">
              Imóveis Cadastrados
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-soft">
            <div className="text-3xl font-bold primary-text">5k+</div>
            <div className="text-sm text-muted-foreground">
              Clientes Satisfeitos
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-soft">
            <div className="text-3xl font-bold primary-text">98%</div>
            <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
          </Card>
        </div>
      </div>
    </section>
  );
}

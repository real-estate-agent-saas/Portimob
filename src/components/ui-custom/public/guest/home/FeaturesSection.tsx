import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Shield, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Home,
      title: "Cadastro Simplificado",
      description: "Interface intuitiva para cadastrar seus imóveis rapidamente, com fotos profissionais e descrições detalhadas."
    },
    {
      icon: Search,
      title: "Busca Inteligente", 
      description: "Encontre exatamente o que procura com nossos filtros avançados e sistema de busca por localização."
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Documentação verificada, transações seguras e suporte jurídico para total tranquilidade."
    },
    {
      icon: Users,
      title: "Rede de Corretores",
      description: "Conecte-se com os melhores corretores da sua região para acelerar negociações."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher nossa <span className="primary-text">plataforma?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos as melhores ferramentas e serviços para tornar sua experiência imobiliária única e eficiente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
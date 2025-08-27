import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload, Handshake, Key } from "lucide-react";
import { GUEST_ROUTES } from "@/config/routes";

import Link from "next/link";

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Crie sua Conta",
      description: "Cadastre-se gratuitamente em nossa plataforma e tenha acesso a todas as funcionalidades."
    },
    {
      icon: Upload,
      title: "2. Cadastre seu Imóvel",
      description: "Adicione fotos, descrição e detalhes do seu imóvel de forma rápida e fácil."
    },
    {
      icon: Handshake,
      title: "3. Conecte-se com Interessados",
      description: "Receba propostas e entre em contato direto com compradores qualificados."
    },
    {
      icon: Key,
      title: "4. Finalize o Negócio",
      description: "Complete a transação com segurança através de nossa plataforma."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como <span className="primary-text">funciona?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em apenas 4 passos simples, você pode começar a anunciar seus imóveis e encontrar compradores.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center p-6 hover:shadow-elegant transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-secondary-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
              )}
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="yellow" size="lg" className="text-lg px-8 py-4" asChild>
            <Link href={GUEST_ROUTES.signUp.path}>Começar Agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};


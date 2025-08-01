import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export function CTASection() {
  return (
    <section className="py-20 bg-primary-gradient">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Card className="p-12 bg-white/95 backdrop-blur-sm shadow-elegant">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de proprietários e corretores que já estão
            usando nossa plataforma para acelerar seus negócios imobiliários.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4"
              asChild
            >
              <Link href={ROUTES.public.signUp}>Criar Conta Gratuita</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              asChild
            >
              <Link href={ROUTES.public.signIn}>Fazer Login</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

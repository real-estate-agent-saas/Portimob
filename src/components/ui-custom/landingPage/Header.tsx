import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { ROUTES } from '@/config/routes';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-gradient rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">ImóvelPro</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors">
            Recursos
          </a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href={ROUTES.public.signIn}>Entrar</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link href={ROUTES.public.signUp}>Cadastrar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
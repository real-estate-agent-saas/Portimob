"use client";

// Next and React imports
import { useState } from "react";
import Link from "next/link";

// Componentes de UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Eye, EyeOff } from "lucide-react";

// Serviços e constantes
import { ROUTES } from "@/config/routes";
import { Messages } from "@/lib/constants/messages";
import { Register, Login } from "@/services/auth/auth";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Usado para desativar o botão durante o envio
  const [error, setError] = useState(""); // Para exibir mensagens de erro
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar a senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      await Register({ name, email, password });
      await Login({ email, password });
    } catch (err: any) {
      setError(err.message || Messages.auth.signUpError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Container centralizado */}
      <div className="w-full max-w-md">
        {/* Logo + nome do sistema com link para a home */}
        <Link
          href={ROUTES.public.home}
          className="flex items-center justify-center space-x-2 mb-8"
        >
          <div className="w-10 h-10 bg-primary-gradient rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">ImóvelPro</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Criar Conta Gratuita
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Campo Senha */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-8 text-muted-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Campo Confirmar Senha */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-8 text-muted-foreground cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Mensagem de erro, se houver */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Botão de envio */}
              <Button
                className="w-full"
                variant="hero"
                type="submit"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>

              {/* Link para login */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Já tem uma conta?{" "}
                </span>
                <Link
                  href={ROUTES.public.signIn}
                  className="primary-text hover:underline"
                >
                  Fazer login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

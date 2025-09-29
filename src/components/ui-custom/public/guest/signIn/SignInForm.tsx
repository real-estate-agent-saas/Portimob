"use client";

// Next
import Link from "next/link";

// UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons
import { Home, Eye, EyeOff } from "lucide-react";

// Routes
import { GUEST_ROUTES, ADMIN_ROUTES } from "@/config/routes";

// Custom Hook
import useSignIn from "@/lib/hooks/auth/useSignIn";

export function SignInForm() {
  const {
    showPassword,
    loading,
    error,
    register,
    handleSubmit,
    handleLogin,
    errors,
    setShowPassword,
  } = useSignIn();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link
          href={GUEST_ROUTES.home.path}
          className="flex items-center justify-center space-x-2 mb-8"
        >
          <div className="w-10 h-10 bg-primary-gradient rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">ImóvelPro</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Fazer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="Seu@email.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Senha</Label>
                <Input
                  placeholder="Sua senha"
                  required
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                {/* SHOW PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-6 text-muted-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                className="w-full"
                variant="hero"
                type="submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Não tem uma conta?{" "}
                </span>
                <Link
                  href={GUEST_ROUTES.signUp.path}
                  className="primary-text hover:underline"
                >
                  Criar conta gratuita
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

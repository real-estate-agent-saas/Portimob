"use client";

// Next / React imports
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Eye, EyeOff } from "lucide-react";

// Routes
import { GUEST_ROUTES } from "@/config/routes";

// Custom Hook
import useSignUp from "@/hooks/auth/useSignUp";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    loading,
    error,
    errors,
    showPassword,
    showConfirmPassword,
    handleRegister,
    setShowPassword,
    setShowConfirmPassword,
  } = useSignUp();

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
            <CardTitle className="text-2xl text-center">
              Criar Conta Gratuita
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Form fields */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input placeholder="Seu nome completo" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Seu@email.com" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Senha</Label>
                <Input
                  placeholder="Crie uma senha"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-6 text-muted-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  placeholder="Confirme sua senha"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-6 text-muted-foreground cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Error message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit button */}
              <Button
                className="w-full"
                variant="hero"
                type="submit"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Já tem uma conta?{" "}
                </span>
                <Link
                  href={GUEST_ROUTES.signIn.path}
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

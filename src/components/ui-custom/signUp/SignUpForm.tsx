"use client";

// Next / React imports
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Eye, EyeOff } from "lucide-react";

// Service
import { Register } from "@/services/auth/auth";

// Routes
import { ROUTES } from "@/config/routes";

// Messages
import { Messages } from "@/lib/constants/messages";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation schema
  const registerSchema = z
    .object({
      name: z.string().min(1, "Nome é obrigatório"),
      email: z.string().email("Email inválido"),
      password: z
        .string()
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .max(20, "Senha deve ter no máximo 20 caracteres")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          "Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], // Associates password confirmation error to confirmPassword field
      message: "As senhas não coincidem",
    });

  // Type for form data
  type RegisterSchema = z.infer<typeof registerSchema>;

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  // Register handler
  async function handleRegister(data: RegisterSchema) {
    setError("");
    try {
      setLoading(true);
      // Removes confirmPassword before sending data to the API
      const { confirmPassword, ...registerData } = data;
      await Register(registerData);
      router.push(ROUTES.public.signIn);
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
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
              {/* Campo Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input placeholder="Seu nome completo" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Seu@email.com" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Campo Senha */}
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
                  className="absolute right-3 top-8 text-muted-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Campo Confirmar Senha */}
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

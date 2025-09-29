"use client";

// Next / React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Zod validations
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Services
import { Login } from "@/api/auth/route";

// Routes
import { ADMIN_ROUTES } from "@/config/routes";

// Messages
import { Messages } from "@/lib/constants/messages";

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validation with zod
  const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
      .max(20, { message: "A senha deve ter no máximo 20 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          "A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um número e um caractere especial",
      }),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Login handler
  async function handleLogin(data: LoginSchema) {
    setError("");
    try {
      setLoading(true);
      await Login(data);
      router.push(ADMIN_ROUTES.dashboard.path);
    } catch (err: any) {
      setError(err.message || Messages.auth.signInError);
    } finally {
      setLoading(false);
    }
  }

  return {
    showPassword,
    loading,
    error,
    register,
    handleSubmit,
    handleLogin,
    errors,
    setShowPassword
  };
}

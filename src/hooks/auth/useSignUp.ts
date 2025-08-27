import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Zod validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Service
import { Register } from "@/services/auth/auth";

// Routes
import { GUEST_ROUTES } from "@/config/routes";

// Messages
import { Messages } from "@/lib/constants/messages";

export default function useSignUp() {
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
      router.push(GUEST_ROUTES.signIn.path);
    } catch (err: any) {
      setError(err.message || Messages.auth.signUpError);
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    handleSubmit,
    loading,
    error,
    errors,
    showPassword,
    showConfirmPassword,
    handleRegister,
    setShowPassword,
    setShowConfirmPassword
  };
}

import { z } from 'zod' // Responsável por definir o esquema de validação

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha obrigatória'),
})

export type LoginSchema = z.infer<typeof loginSchema>

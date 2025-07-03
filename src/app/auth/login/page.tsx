'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha obrigatória'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()
  const [error, setError] = useState('')

  async function onSubmit(data: LoginSchema) {
    try {
      await loginUser(data)
      router.push('/dashboard') // Redireciona após login
    } catch (err: any) {
      console.error(err)
      setError('Credenciais inválidas.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

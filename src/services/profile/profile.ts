import api from '@/services/axios'

export async function getUserProfile() {
  try {
    // Faz a requisição GET
    const response = await api.get(`/me`)
    return response.data

  } catch (error: any) {
    throw new Error('Erro ao buscar perfil')
  }
}
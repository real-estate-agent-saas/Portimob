import api from "@/services/axios";
import { ProfileFormData } from "@/types/profileFormData";

export async function updateUserProfile(data: ProfileFormData) {
  try {
    // Faz a requisição PATCH para atualizar o perfil do usuário
    const response = await api.patch(`/user/update`, data);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao atualizar perfil");
  }
}

export async function getUserProfile() {
  try {
    // Faz a requisição GET
    const response = await api.get(`user/read`);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao buscar perfil");
  }
}

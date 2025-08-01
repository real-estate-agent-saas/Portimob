import api from "@/services/axios";
import { ProfileFormData } from "@/types/profileFormData";

export async function updateUserProfile(data: ProfileFormData) {
  try {
    // Faz a requisição PATCH para atualizar o perfil do usuário
    const response = await api.patch(`/user/update`, data);
    return response.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      if (Array.isArray(err.response.data.message)) {
        throw new Error(err.response.data.message[0]);
      } else {
        throw new Error(err.response.data.message);
      }
    } else {
      throw new Error("Falha ao atualizar usuário");
    }
  }
}

export async function getUserProfile() {
  try {
    // Faz a requisição GET
    const response = await api.get(`user/read`);
    return response.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      if (Array.isArray(err.response.data.message)) {
        throw new Error(err.response.data.message[0]);
      } else {
        throw new Error(err.response.data.message);
      }
    } else {
      throw new Error("Falha ao buscar usuário");
    }
  }
}

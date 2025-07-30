import api from "@/services/axios";
import { LoginData, RegisterData } from "@/types/auth";
import { ROUTES } from "@/config/routes";

export async function Login(data: LoginData) {
  try {
    const response = await api.post("/login", data);
    window.location.href = ROUTES.private.profile;
    return response.data;
  } catch (err: any) {
    throw new Error("Login falhou");
  }
}

export async function Register(data: RegisterData) {
  try {
    const response = await api.post("/user/create", data);
    return response.data; // Retorna o resultado da requisição de registro de usuário
  } catch (err: any) {
    throw new Error("Falha ao registrar usuário");
  }
}

export async function Logout() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error: any) {
    throw new Error("Logout falhou");
  }
}

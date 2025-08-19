import api from "@/services/axios";
import { LoginData, RegisterData } from "@/lib/schemas/user/auth";
import { handleApiCall } from "@/services/apiWrapper";


export async function Login(data: LoginData) {
  const response = await handleApiCall(api.post("/login", data));
  return response;
}

export async function Register(data: RegisterData) {
  return handleApiCall(api.post("/user", data));
}

export async function Logout() {
  return handleApiCall(api.post("/logout"));
}
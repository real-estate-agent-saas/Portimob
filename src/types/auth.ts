export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

// Tipo para a resposta do Login
export interface LoginResponse {
  success: boolean;
}


// Tipo para a resposta do Registro
export type RegisterResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// Tipo para a resposta do Logout
export type LogoutResponse = {
  message: string;
};

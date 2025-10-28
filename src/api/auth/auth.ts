import api from "@/api/axios";
import { SignInData, SignUpData } from "@/lib/schemas/user/auth";
import { handleApiCall } from "@/api/apiWrapper";

// Gets a JWT Token for authentication
export async function signIn(data: SignInData) {
  return await handleApiCall(api.post("/signIn", data));
}

// Creates a new user in the system
export async function signUp(data: SignUpData) {
  return await handleApiCall(api.post("/users", data));
}

// Eliminates user cookie to finish the session
export async function signOut() {
  return await handleApiCall(api.post("/signOut"));
}

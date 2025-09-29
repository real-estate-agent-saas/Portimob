import api from "@/api/axios";
import {
  ProfileFormValues,
} from "@/lib/schemas/user/profileForm";
import {
  User
} from "@/lib/schemas/user/user";

import { Specialty } from "@/lib/schemas/user/specialty";
import { handleApiCall } from "../apiWrapper";

// Updates User based on his JWT Token
export async function updateUserProfile(data: ProfileFormValues) {
  return handleApiCall<User>(api.patch("/user", data));
}

// Updates user image and stores it on cloudinary
export async function updateUserImage(profileImage: string) {
  return handleApiCall<String>(api.patch("/user", { profileImage }));
}

// Gets User based on his JWT Token
export async function getUserProfile() {
  return handleApiCall<User>(api.get("/user"));
}

// Eliminates user cookie to finish the session
export async function logout() {
  return handleApiCall<String>(api.post("/logout"));
}

// Gets specialties related to the user
export async function getAllSpecialties() {
  return handleApiCall<Specialty[]>(api.get("/user/specialties"));
}
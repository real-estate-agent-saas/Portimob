import api from "@/services/axios";
import { profileAPIResponse, profileFormValues } from "@/lib/schemas/user/profileForm";
import { Specialty } from "@/lib/schemas/user/specialty";
import { handleApiCall } from "../apiWrapper";

// Updates User based on his JWT Token
export async function updateUserProfile(data: profileFormValues) {
  return handleApiCall<profileAPIResponse>(api.patch('/user/', data));
}

// Updates user image and stores it on cloudinary
export async function updateUserImage(profileImage: string) {
  return handleApiCall<string>(api.patch('/user', {profileImage}));
}

// Gets User based on his JWT Token
export async function getUserProfile() {
  return handleApiCall<profileAPIResponse>(api.get('/user'));
}

// Eliminates user cookie to finish the session
export async function logout() {
  return handleApiCall<string>(api.post('/logout'));
}

// Gets specialties related to the user
export async function getAllSpecialties() {
  return handleApiCall<Specialty[]>(api.get('/user/specialties'));
}

export async function getSlug() {
  return handleApiCall<String>(api.get('user/slug'));
}
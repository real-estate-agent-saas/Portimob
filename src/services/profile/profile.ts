import api from "@/services/axios";
import { profileAPIResponse, profileFormValues } from "@/lib/schemas/user/profileForm";
import { Specialty } from "@/lib/schemas/user/specialty";
import { handleApiCall } from "../apiWrapper";

// Updates User based on his JWT Token
export async function updateUserProfile(data: profileFormValues) {
  return handleApiCall<profileAPIResponse>(api.patch('/user/update', data));
}

export async function getUserProfile(): Promise<profileAPIResponse> {
  return handleApiCall<profileAPIResponse>(api.get('/user/read'));
}

// Gets specialties related to the user
export async function getAllSpecialties(): Promise<Specialty[]> {
  return handleApiCall<Specialty[]>(api.get('/user/getAllSpecialties'));
}
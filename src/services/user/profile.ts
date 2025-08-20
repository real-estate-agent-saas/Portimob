import api from "@/services/axios";
import {
  profileAPIResponse,
  profileFormValues,
} from "@/lib/schemas/user/profileForm";
import { Specialty } from "@/lib/schemas/user/specialty";
import { UserSlug, SlugAvailabilityResponse } from "@/lib/schemas/user/slug";
import { handleApiCall } from "../apiWrapper";

// Updates User based on his JWT Token
export async function updateUserProfile(data: profileFormValues) {
  return handleApiCall<profileAPIResponse>(api.patch("/user", data));
}

// Updates user image and stores it on cloudinary
export async function updateUserImage(profileImage: string) {
  return handleApiCall<String>(api.patch("/user", { profileImage }));
}

// Gets User based on his JWT Token
export async function getUserProfile() {
  return handleApiCall<profileAPIResponse>(api.get("/user"));
}

// Eliminates user cookie to finish the session
export async function logout() {
  return handleApiCall<String>(api.post("/logout"));
}

// Gets specialties related to the user
export async function getAllSpecialties() {
  return handleApiCall<Specialty[]>(api.get("/user/specialties"));
}

// Checks if the slug the user wants to update is available
export async function checkSlugAvailability(slug: UserSlug) {
  return handleApiCall<SlugAvailabilityResponse>(api.post("/user/slug/isAvailable", slug ))
}

// Gets user slug
export async function getSlug() {
  return handleApiCall<UserSlug>(api.get("/user/slug"));
}

// Updates user slug
export async function updateSlug(slug: UserSlug) {
  return handleApiCall<UserSlug>(api.patch("/user/slug", slug));
}

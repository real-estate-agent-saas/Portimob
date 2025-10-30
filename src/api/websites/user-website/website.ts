import api from "@/api/axios";
import { handleApiCall } from "@/api/apiWrapper";
import { WebsiteUserResponse } from "@/lib/models/websites/website.model";
import { WebsiteFormValues } from "@/lib/schemas/website/website.schema";
import { Specialty } from "@/lib/models/websites/value-objects/specialty";

// Gets website data for the current user
export async function getWebsiteByUserId(): Promise<WebsiteUserResponse> {
  return await handleApiCall(api.get("/websites/user"));
}

// Updates website data for the current user
export async function updateWebsite(
  data: WebsiteFormValues
): Promise<WebsiteUserResponse> {
  return await handleApiCall(api.patch("/websites/user", data));
}

// Gets all specialties to user select wich one to add to website
export async function getAllSpecialties(): Promise<Specialty[] | []> {
  return await handleApiCall(api.get("/websites/user/specialties"));
}

// Updates profile image for the current user
export async function updateProfileImage(
  profileImage: string
): Promise<string> {
  return await handleApiCall(
    api.patch("/websites/user/update-profile-image", { profileImage })
  );
}

// Gets slug for the current user
export async function getCurrentSlug(): Promise<string> {
  return await handleApiCall(api.get("/websites/user/get-slug"));
}

// Checks slug availability
export async function checkSlugAvailability(slug: string): Promise<boolean> {
  return await handleApiCall(
    api.post("/websites/user/check-slug-availability", { slug })
  );
}

// Checks slug availability
export async function updateSlug(slug: string): Promise<string> {
  return await handleApiCall(api.patch("/websites/user/update-slug", { slug }));
}

import api from "@/api/axios";
import { handleApiCall } from "@/api/apiWrapper";
import { WebsiteResponse } from "@/lib/models/website/user-website/website";
import { WebsiteFormValues } from "@/lib/schemas/website/website.schema";
import { Specialty } from "@/lib/models/website/value-objects/specialty";

// Gets website data for the current user
export async function getWebsiteByUserId(): Promise<WebsiteResponse> {
  return await handleApiCall(api.get("/websites/user"));
}

// Updates website data for the current user
export async function updateWebsite(
  data: WebsiteFormValues
): Promise<WebsiteResponse> {
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

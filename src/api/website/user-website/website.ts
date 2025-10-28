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

export async function getAllSpecialties(): Promise<Specialty[] | []> {
  return await handleApiCall(api.get("/websites/user/specialties"));
}

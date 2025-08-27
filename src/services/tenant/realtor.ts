import api from "@/services/axios";
import { RealtorAPIResponse } from "@/lib/schemas/dinamicWebsite/realtor";
import { handleApiCall } from "../apiWrapper";

// Get realtor data based on his slug
export async function getUserBasedOnSlug(slug: string) {
  return handleApiCall<RealtorAPIResponse>(api.get(`/dinamic-website/slug/getUser/${slug}`));
}


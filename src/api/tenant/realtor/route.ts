import api from "@/api/axios";
import { RealtorAPIResponse } from "@/lib/schemas/dynamicWebsite/realtor";
import { handleApiCall } from "@/api/apiWrapper";

// Get realtor data based on his slug
export async function getUserBasedOnSlug(slug: string) {
  return handleApiCall<RealtorAPIResponse>(api.get(`/dynamic-website/slug/getUser/${slug}`));
}


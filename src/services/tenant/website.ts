import api from "../axios";
import {
  UserSlug,
  SlugAvailabilityResponse,
  FindDynamicWebsiteResponse
} from "@/lib/schemas/dynamicWebsite/website";
import { handleApiCall } from "../apiWrapper";

// Checks if the slug is available
export async function checkSlugAvailability(slug: UserSlug) {
  return handleApiCall<SlugAvailabilityResponse>(
    api.post("/dynamic-website/slug/isAvailable", slug)
  );
}

// Checks if the slug exists
export async function findDynamicWebsite(slug: string) {
  return handleApiCall<FindDynamicWebsiteResponse>(
    api.get(`/dynamic-website/${slug}`)
  );
}

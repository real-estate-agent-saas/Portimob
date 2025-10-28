import api from "@/api/axios";
import {
  UserSlug,
  SlugAvailabilityResponse,
  FindDynamicWebsiteResponse,
} from "@/lib/schemas/dynamicWebsite/website";
import { handleApiCall } from "@/api/apiWrapper";




// Gets realtor's website data
export async function getWebsiteData() {
  return handleApiCall(api.get("/dynamic-website"));
}





























// Gets user slug
export async function getSlug() {
  return handleApiCall<UserSlug>(api.get("/dynamic-website/slug/currentSlug"));
}

// Updates user slug
export async function updateSlug(slug: UserSlug) {
  return handleApiCall<UserSlug>(api.patch("/dynamic-website/slug", slug));
}

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

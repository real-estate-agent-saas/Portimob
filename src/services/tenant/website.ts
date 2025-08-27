import api from "../axios";
import {
  UserSlug,
  SlugAvailabilityResponse,
  FindDinamicWebsiteResponse
} from "@/lib/schemas/dinamicWebsite/website";
import { handleApiCall } from "../apiWrapper";

// Checks if the slug is available
export async function checkSlugAvailability(slug: UserSlug) {
  return handleApiCall<SlugAvailabilityResponse>(
    api.post("/dinamic-website/slug/isAvailable", slug)
  );
}

// Checks if the slug exists
export async function findDinamicWebsite(slug: string) {
  return handleApiCall<FindDinamicWebsiteResponse>(
    api.get(`/dinamic-website/${slug}`)
  );
}

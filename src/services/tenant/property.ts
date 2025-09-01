import api from "../axios";
import { Property, FeaturedProperty } from "@/lib/schemas/property/property";
import { handleApiCall } from "../apiWrapper";

// Checks if the slug is available
export async function getFeaturedProperties() {
  return handleApiCall<FeaturedProperty>(
    api.post("/property/getFeatured")
  );
}
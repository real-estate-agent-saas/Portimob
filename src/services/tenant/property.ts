import api from "../axios";
import { Property } from "@/lib/schemas/property/property";
import { handleApiCall } from "../apiWrapper";

// Checks if the slug is available
export async function getFeaturedProperties() {
  return handleApiCall<Property>(
    api.post("/property/getFeatured")
  );
}
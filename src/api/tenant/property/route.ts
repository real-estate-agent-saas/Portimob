import api from "@/api/axios";
import { FeaturedProperty } from "@/lib/schemas/property/property";
import { handleApiCall } from "@/api/apiWrapper";

// Gets featured properties based on dynamic-website slug that is converted into user ID
export async function getFeaturedProperties(userId: number) {
  return handleApiCall<FeaturedProperty[]>(
    api.post("/property/getFeatured", { userId })
  );
}

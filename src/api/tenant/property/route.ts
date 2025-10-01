import api from "@/api/axios";
import { Property, FeaturedProperty } from "@/lib/schemas/property/property";
import { handleApiCall } from "@/api/apiWrapper";

// Gets featured properties based on dynamic-website slug that is converted into user ID
export async function getFeaturedProperties(userId: number) {
  return handleApiCall<FeaturedProperty[]>(
    api.post("/property/getFeaturedBySlug", { userId })
  );
}

// Gets data from a property to show in a separated page
export async function getProperty(userId: number, propertyId: number) {
  return handleApiCall<Property>(
    api.post("/property/findOneBySlug", { userId, propertyId })
  );
}

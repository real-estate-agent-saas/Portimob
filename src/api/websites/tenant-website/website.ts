import api from "@/api/axios";
import { handleApiCall } from "@/api/apiWrapper";
import { WebsiteUserResponse } from "@/lib/models/websites/website.model";

// Gets website data based on the URL slug
export async function getWebsiteBySlug(slug: string): Promise<WebsiteUserResponse> {
  return await handleApiCall(
    api.get(`/websites/tenant/get-website/${slug}`)
  );
}

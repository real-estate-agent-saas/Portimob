import api from "@/api/axios";
import { handleApiCall } from "@/api/apiWrapper";
import { WebsiteTenantResponse } from "@/lib/models/websites/website.model";

// Gets website data based on the URL slug
export async function getWebsiteBySlug(slug: string): Promise<WebsiteTenantResponse> {
  return await handleApiCall(
    api.get(`/websites/tenant/get-website/${slug}`)
  );
}

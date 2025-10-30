import { cache } from "react";
import { notFound } from "next/navigation";
import { getWebsiteBySlug } from "@/api/websites/tenant-website/website";
import { WebsiteTenantResponse } from "@/lib/models/websites/website.model";

export const getWebsiteOrNotFound = cache(
  async (slug: string): Promise<WebsiteTenantResponse> => {
    try {
      return await getWebsiteBySlug(slug);
    } catch (error: any) {
      if (error.status === 404) {
        notFound();
      }
      throw error;
    }
  }
);

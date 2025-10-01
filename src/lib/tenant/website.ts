import { cache } from "react";
import { notFound } from "next/navigation";
import { findDynamicWebsite } from "@/api/tenant/website/route";
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

export const getWebsiteOrNotFound = cache(
  async (slug: string): Promise<FindDynamicWebsiteResponse> => {
    try {
      return await findDynamicWebsite(slug);
    } catch (error: any) {
      if (error.status === 404) {
        notFound();
      }
      throw error;
    }
  }
);

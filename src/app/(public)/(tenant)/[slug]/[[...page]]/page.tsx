// Next
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Services
import { getWebsiteBySlug } from "@/api/websites/tenant-website/website";

// Models
import { WebsiteTenantResponse } from "@/lib/models/websites/website.model";

export default async function TenantDynamicPage({
  params,
}: {
  params: Promise<{ slug: string; page?: string[] }>;
}) {
  const { slug, page } = await params;

  // Verifies if the slug existes to use in the dynamic route
  let website: WebsiteTenantResponse;
  try {
    website = await getWebsiteBySlug(slug);
  } catch (error: any) {
    if (error?.status === 404) notFound();
    throw error;
  }

  // If there is any value in the page, catch them all and mounts the dynamic path to the page
  const dynamicPath = page && page.length ? page.join("/") : "";

  // If dynamic Path gets mounted, adds the complement to it or only the complement
  const pagePath = dynamicPath ? `${dynamicPath}/page` : "page";

  // Executes a dynamic import of the page
  try {
    const TemplatePage = dynamic(
      () =>
        import(
          `@/app/(public)/(tenant)/templates/${website.templateCode}/${pagePath}`
        )
    );

    // Returns the dynamic page inside the dynamic layout
    return <TemplatePage />;
  } catch (err) {
    notFound();
  }
}

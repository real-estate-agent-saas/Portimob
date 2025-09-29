// NotFound page
import { notFound } from "next/navigation";

// Services
import { findDynamicWebsite } from "@/api/tenant/website/route";

// Schema
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

export default async function TenantDynamicPage({
  params,
}: {
  params: Promise<{ slug: string; page?: string[] }>;
}) {
  const { slug, page } = await params;

  // Verifies if the slug existes to use in the dynamic route
  let website: FindDynamicWebsiteResponse;
  try {
    website = await findDynamicWebsite(slug);
  } catch (error: any) {
    if (error?.status === 404) notFound();
    throw error;
  }

  // If there is any value in the page catch-all mounts the dynamic path to the page
  const dynamicPath = page && page.length ? page.join("/") : "";

  // If dynamic Path gets mounted, adds the complement to it or only the complement
  const pagePath = dynamicPath ? `${dynamicPath}/page` : "page";

  // Executes a dynamic import of the page
  try {
    const TemplatePage = (
      await import(`../../templates/${website.template.name}/${pagePath}`)
    ).default;

    // Returns the dynamic page inside the dynamic layout
    return <TemplatePage />;
  } catch (err) {
    notFound();
  }
}

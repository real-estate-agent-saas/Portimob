// Next
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

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

  // If there is any value in the page, catch them all and mounts the dynamic path to the page
  const dynamicPath = page && page.length ? page.join("/") : "";

  // If dynamic Path gets mounted, adds the complement to it or only the complement
  const pagePath = dynamicPath ? `${dynamicPath}/page` : "page";

  // Executes a dynamic import of the page
  try {
    const TemplatePage = dynamic(
      () =>
        import(
          `@/app/(public)/(tenant)/templates/${website.template.name}/${pagePath}`
        )
    );

    // Returns the dynamic page inside the dynamic layout
    return <TemplatePage />;
  } catch (err) {
    notFound();
  }
}

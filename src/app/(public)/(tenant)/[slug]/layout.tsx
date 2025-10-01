// Not Found page
import { notFound } from "next/navigation";
// Service
import { findDynamicWebsite } from "@/api/tenant/website/route";
// Schema
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";
// Context
import { TenantProvider } from "@/lib/contexts/TenantContext";
// Next | React
import { Metadata } from "next";
import { cache } from "react";

// Type for params
type Props = {
  params: { slug: string };
};

// Verifies if the website exists based on the slug. If it doesn't exist throw not found page
const getWebsiteOrNotFound = cache(async (slug: string): Promise<FindDynamicWebsiteResponse> => {
  try {
    return await findDynamicWebsite(slug);
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
});

// Generates dynamic metadata based on the slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const website = await getWebsiteOrNotFound(
    (
      await params
    ).slug
  );

  return {
    title: website.name || website.slug,
  };
}

// Tenant layout that defines which layout will be set
export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // This API call uses the cache from the above request because they use the "same key" in their params
  const website = await getWebsiteOrNotFound((await params).slug);

  const TemplateLayout = (
    await import(`@/app/(public)/(tenant)/templates/${website.template.name}/layout`)
  ).default;

  return (
    <TemplateLayout slug={website.slug} website={website}>
      <TenantProvider userId={website.userId} slug={website.slug}>
        {children}
      </TenantProvider>
    </TemplateLayout>
  );
}

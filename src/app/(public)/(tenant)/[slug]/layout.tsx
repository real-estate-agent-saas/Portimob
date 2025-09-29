// Not Found page
import { notFound } from "next/navigation";

// Service
import { findDynamicWebsite } from "@/api/tenant/website/route";

// Schema
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

// Context
import { TenantProvider } from "@/lib/contexts/TenantContext";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let website: FindDynamicWebsiteResponse;

  try {
    website = await findDynamicWebsite(slug);
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }

  const TemplateLayout = (
    await import(`../templates/${website.template.name}/layout`)
  ).default;

  return (
    <TemplateLayout slug={slug} website={website}>
      <TenantProvider userId={website.userId} slug={slug}>
        {children}
      </TenantProvider>
    </TemplateLayout>
  );
}

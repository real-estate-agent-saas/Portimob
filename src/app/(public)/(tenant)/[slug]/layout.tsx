import { notFound } from "next/navigation";
import { findDynamicWebsite } from "@/services/tenant/website";
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

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
      {children}
    </TemplateLayout>
  );
}

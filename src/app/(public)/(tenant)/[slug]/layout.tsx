// Context Provider
import { TenantProvider } from "@/lib/contexts/TenantContext";

// Next | React
import { Metadata } from "next";

// Lib - Verifies if the website exists based on the slug. If it doesn't exist throw not found page
import { getWebsiteOrNotFound } from "@/lib/tenant/website";

// Type for params
type Props = {
  params: { slug: string };
};

// Generates dynamic metadata based on the slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const website = await getWebsiteOrNotFound((await params).slug);

  return {
    title: website.websiteName || website.slug,
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
    await import(
      `@/app/(public)/(tenant)/templates/${website.templateCode}/layout`
    )
  ).default;

  return (
    <TenantProvider website={website}>
      <TemplateLayout website={website}>{children}</TemplateLayout>
    </TenantProvider>
  );
}

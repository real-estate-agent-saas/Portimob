import { notFound } from "next/navigation";
import { findDinamicWebsite } from "@/services/tenant/website";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const slug = (await params).slug;

  const website = await findDinamicWebsite(slug);

  const TemplateLayout = (
    await import(`../templates/${website.template.name}/layout`)
  ).default;

  if (!website) notFound();

  return <TemplateLayout slug={slug}>{children}</TemplateLayout>;
}

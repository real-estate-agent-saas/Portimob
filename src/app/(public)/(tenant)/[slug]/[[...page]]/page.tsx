import { notFound } from "next/navigation";
import { findDinamicWebsite } from "@/services/tenant/website";

export default async function TenantDynamicPage({
  params,
}: {
  params: { slug: string; page: string[] };
}) {
  const slug = (await params).slug;
  const website = await findDinamicWebsite(slug);

  const pageName = params.page?.[0];

  const pagePath = pageName ? `${pageName}/page` : `page`;

  try {
    const TemplatePage = (
      await import(`../../templates/${website.template.name}/${pagePath}`)
    ).default;
    if (!TemplatePage) notFound();

    return <TemplatePage />;
  } catch (err) {
    console.error("Erro ao importar TemplatePage:", err);
    notFound();
  }
}

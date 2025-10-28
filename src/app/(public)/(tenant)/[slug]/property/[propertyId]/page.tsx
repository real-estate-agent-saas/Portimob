// This file is responsible to be a more specific route compared to [[...page]]
// So in this way is possible to access dynamic properties based on the realtor template

// Next
import dynamic from "next/dynamic";

// Lib - Verifies if the website exists based on the slug. If it doesn't exist throw not found page
import { getWebsiteOrNotFound } from "@/lib/tenant/website";

type Props = {
  params: {
    slug: string;
    propertyId: number;
  };
};

type DynamicPropertyComponentProps = {
  propertyId: number;
};

export default async function DynamicPropertyPage({ params }: Props) {
  const website = await getWebsiteOrNotFound((await params).slug);
  const { propertyId } = await params;
  const DynamicPropertyPage = dynamic<DynamicPropertyComponentProps>(
    () =>
      import(
        `@/app/(public)/(tenant)/templates/${website.template.name}/property/page`
      )
  );

  return <DynamicPropertyPage propertyId={propertyId}></DynamicPropertyPage>;
}

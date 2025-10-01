// Schema
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";
import Link from "next/link";

// Props for this layout
type TemplateDefaultProps = {
  children: React.ReactNode;
  website: FindDynamicWebsiteResponse;
};

export default async function TemplateModern({
  children,
  website,
}: TemplateDefaultProps) {
  return (
    <div>
      {children}
    </div>
  );
}

import { Navbar } from "@/components/ui-custom/public/tenant/default/layout/Navbar";
import { Poppins } from "next/font/google";
import "@/styles/templates/default/variables.css";
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface TemplateDefaultProps {
  children: React.ReactNode;
  slug: string;
  website: FindDynamicWebsiteResponse;
}

type NavbarInfo = {
  logo: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
  name: string;
};

export default async function TemplateDefault({
  children,
  slug,
  website,
}: TemplateDefaultProps) {
  const navbarInfo: NavbarInfo = {
    logo: website.logo,
    whatsapp: website.user.whatsapp,
    facebook: website.user.facebook,
    instagram: website.user.instagram,
    name: website.user.name,
  };

  return (
    <div className={poppins.className}>
      <Navbar slug={slug} navbarInfo={navbarInfo} />
      {children}
    </div>
  );
}

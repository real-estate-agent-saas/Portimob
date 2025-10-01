// Components
import { Navbar } from "@/components/ui-custom/public/tenant/default/layout/Navbar";

// Styles
import { Poppins } from "next/font/google";
import "@/styles/templates/default/variables.css";

// Schema
import { FindDynamicWebsiteResponse } from "@/lib/schemas/dynamicWebsite/website";

// Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Props for this layout
type TemplateDefaultProps = {
  children: React.ReactNode;
  website: FindDynamicWebsiteResponse;
}

// Navbar data do be displayed
type NavbarInfo = {
  slug: string;
  logo: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
  name: string;
};

export default async function TemplateDefault({
  children,
  website,
}: TemplateDefaultProps) {
  const navbarInfo: NavbarInfo = {
    slug: website.slug,
    logo: website.logo,
    whatsapp: website.user.whatsapp,
    facebook: website.user.facebook,
    instagram: website.user.instagram,
    name: website.user.name,
  };

  return (
    <div className={poppins.className}>
      <Navbar navbarInfo={navbarInfo} />
      {children}
    </div>
  );
}
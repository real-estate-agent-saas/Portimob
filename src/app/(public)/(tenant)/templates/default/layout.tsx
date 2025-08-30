import { Navbar } from "@/components/ui-custom/public/tenant/default/layout/Navbar";
import { Poppins } from "next/font/google";
import "@/styles/templates/default/variables.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function TemplateDefault({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return (
    <div className={poppins.className}>
      <Navbar slug={slug} />
      {children}
    </div>
  );
}

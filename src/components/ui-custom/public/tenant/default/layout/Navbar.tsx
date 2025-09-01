"use client";

// Shadcnui components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Component that hides elements but keep them on screen for screen read users
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Icon
import { Menu } from "lucide-react";

// Routes
import { DEFFAULT_TEMPLATE_ROUTES } from "@/config/tenant/default/routes";
import { getTemplateRoutes } from "@/lib/tenant/utils";

// Next / React
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Cloudinary imports
import { CldImage } from "next-cloudinary";

// Formatter
import { whatsappFormatter } from "@/lib/formatters/UIformatters";

// Props
interface NavbarProps {
  slug: string;
  navbarInfo: {
    logo: string | null;
    whatsapp: string | null;
    facebook: string | null;
    instagram: string | null;
    name: string;
  };
}

export function Navbar({ slug, navbarInfo }: NavbarProps) {
  const pathname = usePathname();
  const navList = Object.values(
    getTemplateRoutes(slug, DEFFAULT_TEMPLATE_ROUTES)
  );
  const homeLink = navList[0].path;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-center min-h-[80px] border-b">
      <div className="w-[90%] max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div>
          {navbarInfo.logo && (
            <Link href={homeLink}>
              <CldImage
                width={80}
                height={80}
                src={navbarInfo.logo}
                className="object-cover w-auto"
                alt="Logo da Navbar"
                priority
              />
            </Link>
          )}
        </div>

        {/* Menu Desktop */}
        <NavigationMenu className="hidden md:block ml-10">
          <NavigationMenuList className="gap-2 lg:gap-6">
            {navList.map((item) => {
              const isActive = pathname === item.path;
              return (
                <NavigationMenuItem key={item.title} className="gap-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.path}
                      className={`${
                        isActive ? "text-[var(--navlink)]" : ""
                      } font-semibold text-sm hover:text-[var(--hover-navlink)]`}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Ações (Whats + redes) - escondo no mobile */}
        <div className="hidden xl:flex items-center gap-10">
          {navbarInfo.whatsapp && (
            <a
              href={`https://wa.me/${navbarInfo.whatsapp}?text=Olá%20${navbarInfo.name},`}
              className={`flex items-center gap-3`}
            >
              <p className="font-medium text-[15px]">
                {whatsappFormatter(navbarInfo.whatsapp)}
              </p>
              <Image
                className="w-[19px] h-[19px]"
                src="/whatsappIcon.png"
                alt="Whatsapp Icon"
                width={19}
                height={19}
              />
            </a>
          )}

          <div className="flex gap-4">
            <a href={navbarInfo.facebook ?? ""} target="_blank">
              <Image
                src="/facebookIcon.png"
                alt="Facebook"
                width={21}
                height={21}
              />
            </a>
            <a href={navbarInfo.instagram ?? ""} target="_blank">
              <Image
                src="/instagramIcon.png"
                alt="Instagram"
                width={21}
                height={21}
              />
            </a>
          </div>
        </div>

        {/* Botão Hamburger Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-white w-screen sm:max-w-screen "
              aria-describedby={undefined}
            >
              {/* Its necessary to have a title for screen reader users*/}
              <VisuallyHidden>
                <SheetTitle>Menu de navegação</SheetTitle>
              </VisuallyHidden>

              <nav className="h-screen flex flex-col items-center justify-center gap-10 mb-10">
                {navList.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.title}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`${
                        isActive ? "text-[#447C9C]" : ""
                      } font-semibold text-2xl`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

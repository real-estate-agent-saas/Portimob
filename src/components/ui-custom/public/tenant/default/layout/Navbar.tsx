"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getTenantRoutes } from "@/config/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Navbar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const navList = Object.values(getTenantRoutes(slug));

  return (
    <header className="flex justify-center min-h-[80px] border-b">
      <div className="w-[90%] max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div>
          <img
            width="100"
            height="100"
            src="https://dianaimoveis.com/wp-content/uploads/2024/07/LogoDianaRemovedBg.png"
            className="object-cover"
            alt="Logo"
          />
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
        <div className="hidden xl:flex items-center gap-8">
          <a href="" className="flex items-center gap-3">
            <p className="font-medium text-[15px]">(11) 96653-6993</p>
            <Image
              className="w-[19px] h-[19px]"
              src="/whatsappIcon.png"
              alt="Whatsapp Icon"
              width={19}
              height={19}
            />
          </a>

          <div className="flex gap-4">
            <a href="">
              <Image
                src="/facebookIcon.png"
                alt="Facebook"
                width={21}
                height={21}
              />
            </a>
            <a href="">
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
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-white w-screen sm:max-w-screen "
            >
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Menu de navegação</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>

              <nav className="h-screen flex flex-col items-center justify-center gap-10 mb-10">
                {navList.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.title}
                      href={item.path}
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

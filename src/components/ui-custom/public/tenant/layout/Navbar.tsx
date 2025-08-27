"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { getTenantRoutes } from "@/config/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function Navbar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const navList = Object.values(getTenantRoutes(slug));

  return (
    <header className="flex justify-center min-h-[80px]">
      <div className="w-4/6 flex justify-between items-center">
        <div>
          <img
            width="100"
            height="100"
            src="https://dianaimoveis.com/wp-content/uploads/2024/07/LogoDianaRemovedBg.png"
            sizes="100vw"
            className="object-cover"
            alt="Foto de Perfil"
          />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {navList.map((item) => {
              const isActive = pathname === item.path;
              return (
                <NavigationMenuItem key={item.title} className="gap-3  ">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.path}
                      className={`${
                        isActive ? "text-[#447C9C]" : ""
                      }  font-semibold text-sm`}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <a href={""} className="flex items-center gap-3">
          <p>(11) 96653-6993</p>
          <Image
            className="w-[19px] h-[19px]"
            src="/whatsappIcon.png"
            alt="Whatsapp Icon"
            width={19}
            height={19}
          />
        </a>

        <div className="flex gap-4">
          <a href={""}>
            <Image
              src="/facebookIcon.png"
              alt="Instragram Icon"
              width={21}
              height={21}
            ></Image>
          </a>

          <a href={""}>
            <Image
              src="/instagramIcon.png"
              alt="Instragram Icon"
              width={21}
              height={21}
            ></Image>
          </a>
        </div>
      </div>
    </header>
  );
}

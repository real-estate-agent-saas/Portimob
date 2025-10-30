"use client";

// Shadcn/ui components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Icons
import { Home } from "lucide-react";

// Next / React
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Routes
import { ADMIN_ROUTES, GUEST_ROUTES } from "@/config/routes";

// Service
import { signOut } from "@/api/auth/auth";

export function AppSidebar() {
  // Returns the current pathname
  const pathname = usePathname();

  // Define the main navigation items
  const mainNav = [ADMIN_ROUTES.dashboard, ADMIN_ROUTES.profile, ADMIN_ROUTES.templates];

  // Define the account navigation items on the footer
  const accountNav = {
    configuration: ADMIN_ROUTES.settings,
    logout: ADMIN_ROUTES.logout,
  };

  // Loading to disable logout button
  const [loading, setLoading] = useState<boolean>(false);

  // Router to push user after logout
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push(GUEST_ROUTES.signIn.path);
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header with title */}
      <SidebarHeader>
        <div className="flex justify-end group-data-[collapsible=icon]:justify-center px-2 py-1">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1">
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center shrink-0">
            <Image src="/logo_app.png" alt="App logo" width={32} height={32}/>
          </div>
          <span className="font-semibold truncate group-data-[collapsible=icon]:hidden">
            Portimob
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.path}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Navigation */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={accountNav.configuration.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === accountNav.configuration.path}
                >
                  <Link href={accountNav.configuration.path}>
                    <accountNav.configuration.icon/>
                    <span>{accountNav.configuration.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={accountNav.logout.title}>
                  <SidebarMenuButton onClick={handleLogout} disabled={loading}>
                    <accountNav.logout.icon />
                    <span>{loading ? "Saindo..." : "Sair"}</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

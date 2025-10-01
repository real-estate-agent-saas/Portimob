import type { Metadata } from "next";
import "@/styles/global.css";
import { Toaster } from "sonner";


import { AppSidebar } from "@/components/ui-custom/private/layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Portimob - Painel Administrativo",
};

export default function privateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Toaster richColors position="top-right" />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

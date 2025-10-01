import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portimob",
};

// SaaS Conversion Pages
export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main>
    {children}
   </main>
  );
}

"use client";

// Custom components
import { Header } from "@/components/ui-custom/configuration/Header";
import { CustomSlugCard } from "@/components/ui-custom/configuration/CustomSlugCard";
import { ConfigurationCard } from "@/components/ui-custom/configuration/ConfigurationCard";

export default function Configuracoes() {
  return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <Header />

          <CustomSlugCard />

          <ConfigurationCard />
        </div>
      </div>
  );
}

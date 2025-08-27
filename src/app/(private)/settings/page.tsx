"use client";

// Custom components
import { Header } from "@/components/ui-custom/private/settings/Header";
import { CustomSlugCard } from "@/components/ui-custom/private/settings/CustomSlugCard";
import { ConfigurationCard } from "@/components/ui-custom/private/settings/SettingsCard";

export default function Settings() {
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

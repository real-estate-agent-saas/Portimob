"use client";

// React
import { createContext, useContext } from "react";
//Schema
import { WebsiteTenantResponse } from "@/lib/models/websites/website.model";

interface TenantContextData {
  website: WebsiteTenantResponse;
}

// Creates context that assumes string for slug and null if none value is provided
const TenantContext = createContext<TenantContextData | null>(null);

export function TenantProvider ({
  website,
  children
}: TenantContextData & { children: React.ReactNode }) {
  return (
    <TenantContext.Provider value={{ website }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useSlug precisa estar dentro do SlugProvider");
  return ctx;
}

"use client";

// React
import { createContext, useContext } from "react";

interface TenantContextData {
  userId: number;
  slug: string;
}

// Creates context that assumes string for slug and null if none value is provided
const TenantContext = createContext<TenantContextData | null>(null);

export function TenantProvider ({
  userId,
  slug,
  children,
}: TenantContextData & { children: React.ReactNode }) {
  return (
    <TenantContext.Provider value={{ userId, slug }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useSlug precisa estar dentro do SlugProvider");
  return ctx;
}

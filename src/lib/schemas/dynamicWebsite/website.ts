import { User } from "@/lib/schemas/user/user";

// Expected format for backend
export interface UserSlug {
  slug: string;
}

// Response from (slug availability)
export interface SlugAvailabilityResponse {
  available: boolean;
  reason?: string;
}

// Response from (find dynamic website)
export interface FindDynamicWebsiteResponse {
  id: number;
  name: string;
  userId: number;
  templateId: number;
  logo: string;
  slug: string;
  customDomain: string;
  createdAt: string;
  updatedAt: string;
  template: Template;
  user: User;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  previewUrl: string | null;
}

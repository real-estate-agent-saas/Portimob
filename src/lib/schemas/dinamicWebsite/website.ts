// Expected format for backend
export interface UserSlug {
  slug: string;
};

// Response from slug availability
export interface SlugAvailabilityResponse {
  available: boolean;
  reason?: string;
}

// Response from find dinamic website
export interface FindDinamicWebsiteResponse {
  id: number;
  userId: number;
  templateId: number;
  logoUrl: string;
  slug: string;
  customDomain: string;
  createdAt: string;
  updatedAt: string;
  template: Template;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  previewUrl: string | null;
}
export interface UserSlug {
  slug: string;
};

export interface SlugAvailabilityResponse {
  available: boolean;
  reason?: string;
}
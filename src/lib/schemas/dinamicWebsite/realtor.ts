import { ProfileAPIResponse } from "../user/profileForm";

// API Response dinamic-website
export type RealtorAPIResponse = {
  logoUrl: string | null;
  slug: string;
  user: ProfileAPIResponse
};
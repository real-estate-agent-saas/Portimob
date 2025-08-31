import { User } from "../user/user";

// API Response dynamic-website
export type RealtorAPIResponse = {
  logoUrl: string | null;
  slug: string;
  user: User
};
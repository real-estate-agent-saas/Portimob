import { Specialty } from "./value-objects/specialty";

export interface WebsiteUserResponse {
  realtorName: string;
  publicEmail: string | null;
  whatsapp: string | null;
  phone: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  profileImage: string | null;
  bio: string | null;
  careerStartDate: string | null;
  creci: string | null;
  gender: string | null;
  specialties: Specialty[] | [];
  templateCode: string | null;
}

export interface WebsiteTenantResponse {
  websiteName: string | null;
  logoURL: string | null;
  realtorName: string;
  publicEmail: string | null;
  whatsapp: string | null;
  phone: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  profileImage: string | null;
  bio: string | null;
  careerStartDate: string | null;
  creci: string | null;
  gender: string | null;
  specialties: Specialty[] | [];
  templateCode: string | null;
  slug: string;
  config: Record<string, any> | null;
}

export interface WebsiteFormValues {
  realtorName: string;
  websiteName: string;
  publicEmail: string | null;
  whatsapp: string | null;
  phone: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  profileImage: string | null;
  bio: string | null;
  careerStartDate: string | null;
  creci: string | null;
  gender: string | null;
  specialties: Specialty[] | [];
}

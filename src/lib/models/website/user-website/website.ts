import { Specialty } from "../value-objects/specialty";

export interface WebsiteResponse {
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

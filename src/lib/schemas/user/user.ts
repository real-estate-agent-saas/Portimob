import { Specialty } from "./specialty";

// Basic user model:
export type User = {
  name: string;
  tradingName: string | null;
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
};
import { Specialty } from "./specialty";

// API Response for user data
export type profileAPIResponse = {
  name?: string;
  email?: string;
  careerStartDate?: string | undefined;
  publicEmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  creci?: string;
  bio?: string;
  gender?: string;
  profileImage?: string;
  specialties?: Specialty[];
};

// Values the API expects to recive
export type profileFormValues = Omit<profileAPIResponse, "specialties"> & {
  specialties: number[];
};

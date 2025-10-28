import { profile } from "console";
import { z } from "zod";

// Zod form for update user profile
export const websiteFormSchema = z.object({
  realtorName: z
    .string()
    .trim()
    .regex(/^((?!\p{Extended_Pictographic}).)*$/u, "Emojis não são permitidos"),
  publicEmail: z
    .union([z.string().email({ message: "Email inválido" }), z.literal("")])
    .optional(),
  careerStartDate: z.string().optional(),
  whatsapp: z.string().optional(),
  phone: z.union([z.string(), z.literal("")]).optional(),
  instagram: z.union([z.string().trim(), z.literal("")]).optional(),
  facebook: z.union([z.string().trim(), z.literal("")]).optional(),
  linkedin: z.union([z.string().trim(), z.literal("")]).optional(),
  creci: z.union([z.string().trim(), z.literal("")]).optional(),
  bio: z.union([z.string().trim(), z.literal("")]).optional(),
  gender: z.union([z.string(), z.literal("")]).optional(),
  specialties: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

export type WebsiteFormValues = z.infer<typeof websiteFormSchema>;

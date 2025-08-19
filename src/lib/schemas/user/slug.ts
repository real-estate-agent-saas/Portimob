import { z } from "zod";

export const slugSchema = z.object({

});

export type slugForm = z.infer<typeof slugSchema>;
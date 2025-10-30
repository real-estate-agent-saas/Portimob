import api from "@/api/axios";
import { handleApiCall } from "@/api/apiWrapper";
import { TemplateReponse } from "@/lib/models/templates/templates.model";

// Gets website data for the current user
export async function getAllTemplates(): Promise<TemplateReponse[]> {
  return await handleApiCall(api.get("/templates"));
}

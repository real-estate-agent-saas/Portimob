// React | Next
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Types | Schemas
import {
  websiteFormSchema,
  WebsiteFormValues
} from "@/lib/schemas/website/website.schema";
import { WebsiteResponse } from "@/lib/models/website/user-website/website";

// Services
import { getWebsiteByUserId, updateWebsite } from "@/api/website/user-website/website";

// Utils
import {
  extractDateFromISO,
  convertDateToISO,
} from "@/lib/formatters/dateFormatters";
import { convertEmptyStringsToNull } from "@/lib/formatters/apiFormatters";

// Custom Hook
export default function useWebsiteUpdateForm() {
  const [websiteData, setWebsiteData] = useState<WebsiteResponse>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");

  // React Hook Form with zod validation
  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {} as WebsiteFormValues,
  });

  // Fetch website data
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await getWebsiteByUserId();
        setWebsiteData(response);
      } catch (e) {
        console.error("Erro ao buscar dados do Website:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Resets form when websiteData changes
  useEffect(() => {
    if (websiteData) {
      form.reset({
        realtorName: websiteData.realtorName,
        careerStartDate: extractDateFromISO(websiteData.careerStartDate),
        publicEmail: websiteData.publicEmail ?? "",
        whatsapp: websiteData.whatsapp ?? "",
        phone: websiteData.phone ?? "",
        instagram: websiteData.instagram ?? "",
        facebook: websiteData.facebook ?? "",
        linkedin: websiteData.linkedin ?? "",
        creci: websiteData.creci ?? "",
        bio: websiteData.bio ?? "",
        gender: websiteData.gender ?? "",
        specialties: websiteData.specialties ?? [],
      });
      setProfileImage(websiteData.profileImage ?? "");
    }
  }, [websiteData, form]);

  // Submit
  const onSubmit = async (data: WebsiteFormValues) => {
    try {
      const payload: WebsiteFormValues = {
        ...convertEmptyStringsToNull(data),
        realtorName: data.realtorName,
        careerStartDate: convertDateToISO(data.careerStartDate),
        specialties: data.specialties,
      };

      const updatedProfile = await updateWebsite(payload);
      console.log(payload);
      setWebsiteData(updatedProfile);
      setIsEditing(false);
      toast.success("Website atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar website.");
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return {
    form,
    loading,
    setLoading,
    isEditing,
    setIsEditing,
    onSubmit,
    handleCancel,
    profileImage,
  };
}

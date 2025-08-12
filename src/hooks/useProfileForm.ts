// React / Next
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Types
import {
  profileAPIResponse,
  profileFormSchema,
  profileFormValues,
} from "@/lib/schemas/user/profileForm";

// Services
import { getUserProfile, updateUserProfile } from "@/services/profile/profile";

// Utils
import { extractDateFromISO, convertDateToISO } from "@/lib/utils/formatters/dateFormatters";
import { convertEmptyStringsToNull } from "@/lib/utils/formatters/apiFormatters";

// Custom Hook
export default function useProfileForm() {
  const [userData, setUserData] = useState<profileAPIResponse>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // React Hook Form with zod validation
  const form = useForm<profileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {} as profileFormValues,
  });

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getUserProfile();
        setUserData(response);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Resets form when userData changes
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        careerStartDate: extractDateFromISO(userData.careerStartDate),
        publicEmail: userData.publicEmail ?? "",
        whatsapp: userData.whatsapp ?? "",
        phone: userData.phone ?? "",
        instagram: userData.instagram ?? "",
        facebook: userData.facebook ?? "",
        linkedin: userData.linkedin ?? "",
        creci: userData.creci ?? "",
        bio: userData.bio ?? "",
        gender: userData.gender ?? "",
        profileImage: userData.profileImage ?? "",
        specialties: userData.specialties?.map((s) => s.id) ?? [],
      });
    }
  }, [userData, form]);

  // Submit
  const onSubmit = async (data: profileFormValues) => {
    try {
      const payload: profileFormValues = {
        ...convertEmptyStringsToNull(data),
        name: data.name,
        careerStartDate: convertDateToISO(data.careerStartDate),
        specialties: data.specialties,
      };

      const updatedProfile = await updateUserProfile(payload);
      console.log(payload);
      setUserData(updatedProfile);
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
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
  };
}
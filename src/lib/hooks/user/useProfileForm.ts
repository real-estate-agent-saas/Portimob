// React / Next
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Types
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/lib/schemas/user/profileForm";

import {
  User
} from "@/lib/schemas/user/user";

// Services
import { getUserProfile, updateUserProfile } from "@/api/user/route";

// Utils
import {
  extractDateFromISO,
  convertDateToISO,
} from "@/lib/formatters/dateFormatters";
import { convertEmptyStringsToNull } from "@/lib/formatters/apiFormatters";

// Custom Hook
export default function useProfileForm() {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");

  // React Hook Form with zod validation
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {} as ProfileFormValues,
  });

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await getUserProfile();
        setUserData(response);
      } catch (e) {
        console.error("Erro ao buscar perfil do usuário:", e);
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
        specialties: userData.specialties?.map((s) => s.id) ?? [],
      });
      setProfileImage(userData.profileImage ?? "");
    }
  }, [userData, form]);

  // Submit
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const payload: ProfileFormValues = {
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
    profileImage,
  };
}

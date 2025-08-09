// Next and React imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

// Types
import {
  profileAPIResponse,
  profileFormValues,
} from "@/types/user/profileForm";

//Services
import { getUserProfile, updateUserProfile } from "@/services/profile/profile";

// Custom Hook
export default function useProfileForm() {
  // Recive user data
  const [userData, setUserData] = useState<profileAPIResponse | null>(null);

  // Manage loading states with skeletons
  const [loading, setLoading] = useState(true);

  // Manage editing state
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with react-hook-form and set default types
  const form = useForm<profileFormValues>({
    defaultValues: {} as profileFormValues, // inicia vazio, será populado no reset
  });

  // Fetch user profile data on component mount
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

  // Reset form with user data when it is fetched
  useEffect(() => {
    if (userData) {
      console.log(form);
      form.reset({
        name: userData.name,
        careerStartDate: userData.careerStartDate
          ? format(parseISO(userData.careerStartDate), "yyyy-MM-dd")
          : null,
        publicEmail: userData.publicEmail,
        whatsapp: userData.whatsapp,
        phone: userData.phone,
        instagram: userData.instagram,
        facebook: userData.facebook,
        linkedin: userData.linkedin,
        creci: userData.creci,
        bio: userData.bio,
        gender: userData.gender,
        profileImage: userData.profileImage,
        specialties: userData.specialties?.map((specialty) => specialty.id), //Maps the id into an array of numbers
      });
    }
  }, [userData]);

  // Execute when submiting the form
  const onSubmit = async (data: profileFormValues) => {
    try {
      // Convert date to ISO format if it exists
      const payload: profileFormValues = {
        ...data,
        careerStartDate: data.careerStartDate
          ? new Date(data.careerStartDate).toISOString()
          : null,
      };

      // Updates the user with the previously manipulated data
      const updatedProfile = await updateUserProfile(payload);
      setUserData(updatedProfile); // Updates local inputs with the new values
      setIsEditing(false); // Exit edit mode
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  // Reset form and exit editing mode
  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return {
    form,
    setLoading,
    loading,
    isEditing,
    setIsEditing,
    onSubmit,
    handleCancel,
  };
}

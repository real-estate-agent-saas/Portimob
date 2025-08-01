"use client";

// Next and React imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

// Types and Services
import { ProfileFormData } from "@/types/profileFormData";
import { getUserProfile, updateUserProfile } from "@/services/profile/profile";

// Components
import Header from "@/components/ui-custom/profile/Header";
import ContactCard from "@/components/ui-custom/profile/ContactCard";
import ProfessionalInfoCard from "@/components/ui-custom/profile/ProfessionalInfoCard";
import SocialMediaCard from "@/components/ui-custom/profile/SocialMediaCard";
import PersonalInfoCard from "@/components/ui-custom/profile/PersonalInfoCard";

// ---------------------------- Profile Component ----------------------------
export default function Profile() {
  // State to hold user data and loading state
  const [userData, setUserData] = useState<ProfileFormData | null>(null);

  // State to manage loading states with skeletons
  const [loading, setLoading] = useState(true);

  // State to manage editing state
  const [isEditing, setIsEditing] = useState(false);

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

  // Initialize form with react-hook-form and set default types
  const form = useForm<ProfileFormData>({
    defaultValues: {} as ProfileFormData, // inicia vazio, será populado no reset
  });

  // Reset form with user data when it is fetched
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
        careerStartDate: userData.careerStartDate
          ? format(parseISO(userData.careerStartDate), "yyyy-MM-dd")
          : "",
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
      });
    }
  }, [userData, form]);

  // Execute when submiting the form
  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Converter a data para o formato ISO se existir
      const payload = {
        ...data,
        careerStartDate: data.careerStartDate
          ? new Date(data.careerStartDate).toISOString()
          : null,
      };

      const updatedProfile = await updateUserProfile(payload);
      setUserData(updatedProfile); // Atualiza os dados locais
      setIsEditing(false); // Sai do modo de edição
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <Header
          form={form}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={onSubmit}
          handleCancel={handleCancel}
          loading={loading}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <ContactCard form={form} isEditing={isEditing} loading={loading} />

          {/* Professional Info */}
          <ProfessionalInfoCard
            form={form}
            isEditing={isEditing}
            loading={loading}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Social Media */}
          <SocialMediaCard
            form={form}
            isEditing={isEditing}
            loading={loading}
          />

          {/* Personal Info */}
          <PersonalInfoCard
            form={form}
            isEditing={isEditing}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

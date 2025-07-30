"use client";

// Next and React imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInYears } from "date-fns";
import { toast } from "sonner";

// Types and Services
import { ProfileFormData } from "@/types/profileFormData";
import { getUserProfile } from "@/services/profile/profile";

// Components
import Header from "@/components/profile/Header";
import ContactCard from "@/components/profile/ContactCard";
import ProfessionalInfoCard from "@/components/profile/ProfessionalInfoCard";
import SocialMediaCard from "@/components/profile/SocialMediaCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";

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
        jobTitle: userData.jobTitle || "Corretor de Imóveis",
        email: userData.email,
        startDate: userData.startDate || "2020-01-15",
        publicEmail: userData.publicEmail,
        whatsapp: userData.whatsapp,
        phone: userData.phone,
        instagram: userData.instagram,
        facebook: userData.facebook,
        linkedin: userData.linkedin,
        creci: userData.creci,
        bio: userData.bio || "Descreva sua experiência e especialidades...",
        gender: userData.gender,
        profileImage:
          userData.profileImage || "photo-1581091226825-a6a2a5aee158",
      });
    }
  }, [userData, form]);

  const calcularExperiencia = (dataInicio: string) => {
    if (!dataInicio) return "0 anos";
    const anos = differenceInYears(new Date(), new Date(dataInicio));
    return anos === 1 ? "1 ano de experiência" : `${anos} anos de experiência`;
  };

  const onSubmit = (data: ProfileFormData) => {
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

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
          <ContactCard form={form} isEditing={isEditing} loading={loading}/>

          {/* Professional Info */}
          <ProfessionalInfoCard form={form} isEditing={isEditing} loading={loading} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Social Media */}
          <SocialMediaCard form={form} isEditing={isEditing} loading={loading} /> 

          {/* Personal Info */}
          <PersonalInfoCard form={form} isEditing={isEditing} loading={loading} />
        </div>
      </div>
    </div>
  );
}
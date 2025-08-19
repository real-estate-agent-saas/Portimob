"use client";

// Components
import Header from "@/components/ui-custom/profile/Header";
import ContactCard from "@/components/ui-custom/profile/ContactCard";
import ProfessionalInfoCard from "@/components/ui-custom/profile/ProfessionalInfoCard";
import SocialMediaCard from "@/components/ui-custom/profile/SocialMediaCard";
import PersonalInfoCard from "@/components/ui-custom/profile/PersonalInfoCard";

// Custom Hook
import useProfileForm from "@/hooks/user/useProfileForm";

// ---------------------------- Profile Component ----------------------------
export default function Profile() {
  // Custom hook to manage user form
  const {
    form,
    setLoading,
    loading,
    isEditing,
    setIsEditing,
    onSubmit,
    handleCancel,
    profileImage,
  } = useProfileForm();

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
          profileImage={profileImage}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <ContactCard 
          form={form} 
          isEditing={isEditing} 
          loading={loading} 
          />

          {/* Professional Info */}
          <ProfessionalInfoCard
            form={form}
            isEditing={isEditing}
            loading={loading}
            setLoading={setLoading}
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

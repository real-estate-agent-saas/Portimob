"use client";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Edit, Save, X, Award } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// React / Next
import { useEffect, useState } from "react";

// Cloudinary imports
import {
  CldUploadButton,
  CldImage,
  type CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

// Hooks
import { UseFormReturn } from "react-hook-form";

// Types / Schemas
import { profileFormValues } from "@/lib/schemas/user/profileForm";

// Utils
import { calculateExperienceTime } from "@/lib/formatters/dateFormatters";

// Assets
import blankProfilePicture from "@/assets/profile/blankProfilePicture.png";

// Services
import { updateUserImage } from "@/services/user/profile";

// Interface for component props
interface ProfileHeaderProps {
  form: UseFormReturn<profileFormValues>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSubmit: (values: profileFormValues) => void;
  handleCancel: () => void;
  loading: boolean;
  profileImage?: string;
}

// Main Profile Header Component
export default function Header({
  form,
  isEditing,
  setIsEditing,
  onSubmit,
  handleCancel,
  loading,
  profileImage,
}: ProfileHeaderProps) {
  //Form values to show
  const { creci, name, gender, careerStartDate } = form.watch();

  const [profileImageId, setProfileImageId] = useState<string | undefined>(
    profileImage
  );

  useEffect(() => {
    setProfileImageId(profileImage);
  }, [profileImage]);

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      typeof result.info !== "string" &&
      result.info?.public_id
    ) {
      const publicId = (result.info as CloudinaryUploadWidgetInfo).public_id;

      try {
        await updateUserImage(publicId);
        setProfileImageId(publicId);
        toast.success("Imagem atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a imagem de perfil:", error);
        toast.error("Erro ao atualizar a imagem de perfil.");
      }
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            {loading ? (
              <Skeleton className="w-32 h-32 mb-4 rounded-full ring-4 ring-primary/20" />
            ) : (
              <Avatar className="w-32 h-32 mb-4 ring-4 ring-primary/20">
                {profileImageId ? (
                  <CldImage
                    width="960"
                    height="600"
                    src={profileImageId}
                    sizes="100vw"
                    className="object-cover"
                    alt="Foto de Perfil"
                  />
                ) : (
                  <AvatarImage
                    src={blankProfilePicture.src}
                    alt="Foto padrão"
                  />
                )}
                <AvatarFallback>
                  <img src={blankProfilePicture.src} alt="Foto padrão" />
                </AvatarFallback>
              </Avatar>
            )}

            {isEditing && (
              <CldUploadButton
                onSuccess={handleUploadSuccess}
                uploadPreset="uploadProfilePicture"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 flex items-center justify-center bg-secondary hover:bg-secondary/80 transition cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </CldUploadButton>
            )}
          </div>

          {!isEditing ? (
            <>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-6 w-64 mb-4" />
                  <div className="flex gap-2 mb-6">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-6 w-40 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-30 rounded-full" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {name}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">
                    {`${
                      gender === "FEMININO" ? "Corretora" : "Corretor"
                    } de Imóveis `}
                  </p>
                  <div className="flex gap-2 mb-6">
                    <Badge variant="secondary" className="px-3 py-1">
                      <Award className="w-4 h-4 mr-2" />
                      CRECI: {creci || "N/A"}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {calculateExperienceTime(careerStartDate)}
                    </Badge>
                  </div>
                </>
              )}

              {!loading && (
                <Button
                  variant="hero"
                  className="gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4" />
                  Editar Perfil
                </Button>
              )}
            </>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-md space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={80} minLength={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creci"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRECI</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Ex: 123456-F"
                          minLength={6}
                          maxLength={8}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center gap-2 pt-4">
                  <Button type="submit" variant="hero" className="gap-2">
                    <Save className="w-4 h-4" />
                    Salvar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

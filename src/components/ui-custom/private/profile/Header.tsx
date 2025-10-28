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

// Cloudinary
import {
  CldUploadButton,
  CldImage,
  type CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

// Hooks
import { UseFormReturn } from "react-hook-form";

// Types / Schemas
import { WebsiteFormValues } from "@/lib/schemas/website/website.schema";

// Utils
import { calculateExperienceTime } from "@/lib/formatters/dateFormatters";

// Assets
import blankProfilePicture from "@/assets/profile/blankProfilePicture.png";

// Services
import { updateProfileImage } from "@/api/website/user-website/website";

// Interface for component props
interface ProfileHeaderProps {
  form: UseFormReturn<WebsiteFormValues>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSubmit: (values: WebsiteFormValues) => void;
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
  const { creci, realtorName, gender, careerStartDate } = form.watch();

  // Clounary Image Identifier
  const [cloudinaryImage, setCloudinaryImage] = useState<string | undefined>(
    profileImage
  );

  // Starts cloudnary image with a DB value
  useEffect(() => {
    setCloudinaryImage(profileImage);
  }, [profileImage]);

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      typeof result.info !== "string" &&
      result.info?.public_id
    ) {
      const cloudinaryImageId = (result.info as CloudinaryUploadWidgetInfo)
        .public_id;

      // Updates profile image ID on DB and already sets it to the page
      try {
        await updateProfileImage(cloudinaryImageId);
        setCloudinaryImage(cloudinaryImageId);
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
              <div className="relative group w-32 h-32 mb-4">
                <Avatar className="w-full h-full ring-4 ring-neutral-300">
                  {cloudinaryImage ? (
                    <>
                      {/* Imagem de perfil */}
                      <CldImage
                        width="960"
                        height="600"
                        src={cloudinaryImage}
                        sizes="100vw"
                        className="object-cover rounded-full w-full h-full"
                        alt="Foto de Perfil"
                        priority
                      />
                    </>
                  ) : (
                    <AvatarImage
                      src={blankProfilePicture.src}
                      alt="Foto padrão"
                    />
                  )}
                </Avatar>
                <CldUploadButton
                  onSuccess={handleUploadSuccess}
                  uploadPreset="uploadProfilePicture"
                  className="
                absolute bottom-1 right-1
                rounded-full w-9 h-9
                flex items-center justify-center
                bg-zinc-200/90 hover:bg-zinc-300
                cursor-pointer border-2 border-white shadow-sm
                opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-opacity duration-200 ease-in-out
              "
                >
                  <Camera className="w-4 h-4 text-zinc-800" />
                </CldUploadButton>
              </div>
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
                    {realtorName}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4 text-neutral-500">
                    {`${
                      gender === "FEMININO" ? "Corretora" : "Corretor"
                    } de Imóveis`}
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
                  name="realtorName"
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

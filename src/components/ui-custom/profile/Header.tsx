// Hooks, Types and utils
import { UseFormReturn } from "react-hook-form";
import { profileFormValues } from "@/types/user/profileForm";
import { calculateExperienceTime } from "@/lib/utils/utils";

// Assets
import blankProfilePicture from "@/assets/profile/blankProfilePicture.png";

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

// Interface for component props
interface ProfileHeaderProps {
  form: UseFormReturn<profileFormValues>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSubmit: (values: profileFormValues) => void;
  handleCancel: () => void;
  loading: boolean;
}

// Main Profile Header Component
export default function Header({
  form,
  isEditing,
  setIsEditing,
  onSubmit,
  handleCancel,
  loading,
}: ProfileHeaderProps) {

  //Form values to show
  const { profileImage, creci, name, gender, careerStartDate } = form.watch();

  return (
    <Card className="mb-8">
      <CardContent className="pt-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            {loading ? (
              <Skeleton className="w-32 h-32 mb-4 rounded-full ring-4 ring-primary/20" />
            ) : (
              <Avatar className="w-32 h-32 mb-4 ring-4 ring-primary/20">
                <AvatarImage
                  src={profileImage || blankProfilePicture.src}
                  alt="Foto do Corretor"
                />
                <AvatarFallback>
                  <img src={blankProfilePicture.src} alt="Foto padrão" />
                </AvatarFallback>
              </Avatar>
            )}

            {isEditing && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => {
                  // lógica de upload de imagem
                }}
              >
                <Camera className="w-4 h-4" />
              </Button>
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
                        <Input {...field} />
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
                        <Input {...field} value={field.value ?? ""} placeholder="123456-F" />
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

// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../ui/skeleton";
import { AtSign } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Hooks, Types and Utils
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/types/profileFormData";
import { getFieldValueOrFallback } from "@/lib/utils/formatters";

interface SocialMediaCardProps {
  form: UseFormReturn<ProfileFormData>;
  isEditing: boolean;
  loading: boolean;
}

export default function SocialMediaCard({
  form,
  isEditing,
  loading,
}: SocialMediaCardProps) {
  return (
    <Card>
      <CardHeader>
        {loading ? (
          <Skeleton className="w-60 h-8" />
        ) : (
          <>
            <CardTitle className="flex items-center gap-2">
              <AtSign />
              Redes Sociais
            </CardTitle>
          </>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            {loading ? (
              <>
                <Skeleton className="w-40 h-8" />
                <Skeleton className="w-40 h-8 mt-4" />
                <Skeleton className="w-40 h-8 mt-4" />
              </>
            ) : (
              <>
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-muted-foreground">
                    {getFieldValueOrFallback(form.watch("instagram"))}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-muted-foreground">
                    {getFieldValueOrFallback(form.watch("facebook"))}
                  </p>
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-muted-foreground">
                    {getFieldValueOrFallback(form.watch("linkedin"))}
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="@usuário" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome no Facebook" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="usuario-linkedin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

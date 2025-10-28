// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../../ui/skeleton";
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
import { WebsiteFormValues } from "@/lib/schemas/website/website.schema";
import { getFieldValueOrFallback } from "@/lib/formatters/UIformatters";

interface SocialMediaCardProps {
  form: UseFormReturn<WebsiteFormValues>;
  isEditing: boolean;
  loading: boolean;
}

export default function SocialMediaCard({
  form,
  isEditing,
  loading,
}: SocialMediaCardProps) {
  //Form values to show
  const { instagram, facebook, linkedin } = form.watch();
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
                  <p className="text-muted-foreground text-neutral-500">
                    {getFieldValueOrFallback(instagram)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-muted-foreground text-neutral-500">
                    {getFieldValueOrFallback(facebook)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-muted-foreground text-neutral-500">
                    {getFieldValueOrFallback(linkedin)}
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
                      <Input
                        {...field}
                        placeholder="Link do seu perfil"
                        maxLength={120}
                      />
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
                      <Input
                        {...field}
                        placeholder="Link do seu perfil"
                        maxLength={120}
                      />
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
                      <Input
                        {...field}
                        placeholder="Link do seu perfil"
                        maxLength={120}
                      />
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

// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "../../../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserRound } from "lucide-react";

// Hooks
import { UseFormReturn } from "react-hook-form";

// Types and Utils
import { ProfileFormValues } from "@/lib/schemas/user/profileForm";
import { formatGender } from "@/lib/formatters/apiFormatters";
import { getFieldValueOrFallback } from "@/lib/formatters/UIformatters";

interface PersonalInfoCardProps {
  form: UseFormReturn<ProfileFormValues>;
  isEditing: boolean;
  loading: boolean;
}

export default function PersonalInfoCard({
  form,
  isEditing,
  loading,
}: PersonalInfoCardProps) {
  //Form values to show
  const { gender, bio } = form.watch();

  return (
    <Card>
      <CardHeader>
        {loading ? (
          <Skeleton className="w-60 h-8" />
        ) : (
          <>
            <CardTitle className="flex items-center gap-2">
              <UserRound />
              Informações Pessoais
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
                <Skeleton className="w-80 h-20" />
              </>
            ) : (
              <>
                <div>
                  <p className="font-medium">Gênero</p>
                  <p className="text-muted-foreground capitalize text-neutral-500">
                    {formatGender(getFieldValueOrFallback(gender))}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Descrição do Perfil</p>
                  <p className="text-muted-foreground text-neutral-500">
                    {getFieldValueOrFallback(bio)}
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MASCULINO">Masculino</SelectItem>
                        <SelectItem value="FEMININO">Feminino</SelectItem>
                        <SelectItem value="OUTROS">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Perfil</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descreva sua experiência e especialidades..."
                        className="min-h-[100px]"
                        maxLength={1000}
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

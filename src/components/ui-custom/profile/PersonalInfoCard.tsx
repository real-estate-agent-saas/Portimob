// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "../../ui/skeleton";
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

// Hooks, Types and Utils
import { UseFormReturn } from "react-hook-form";
import { profileFormValues } from "@/types/user/profileForm";
import { getFieldValueOrFallback } from "@/lib/utils/formatters";

interface PersonalInfoCardProps {
  form: UseFormReturn<profileFormValues>;
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
                  <p className="text-muted-foreground capitalize">
                    {getFieldValueOrFallback(gender)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Descrição do Perfil</p>
                  <p className="text-muted-foreground">
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
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

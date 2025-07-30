// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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

// Hooks and Types
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/types/profileFormData";
import { Skeleton } from "../ui/skeleton";

interface PersonalInfoCardProps {
  form: UseFormReturn<ProfileFormData>;
  isEditing: boolean;
  loading: boolean;
}

export default function PersonalInfoCard({
  form,
  isEditing,
  loading,
}: PersonalInfoCardProps) {
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
                    {form.watch("gender")}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Descrição do Perfil</p>
                  <p className="text-muted-foreground">{form.watch("bio")}</p>
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
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="prefiro-nao-informar">
                          Prefiro não informar
                        </SelectItem>
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

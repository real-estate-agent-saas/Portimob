// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Award, X, Plus } from "lucide-react";

// Hooks and Types
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/types/profileFormData";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ProfessionalInfoCardProps {
  form: UseFormReturn<ProfileFormData>;
  isEditing: boolean;
  loading: boolean;
}

export default function ProfessionalInfoCard({
  form,
  isEditing,
  loading,
}: ProfessionalInfoCardProps) {
  const [specialties, setSpecialties] = useState<string[]>([
    "Residencial",
    "Comercial",
    "Luxury",
    "Investimentos",
  ]);
  const [novaEspecialidade, setNovaEspecialidade] = useState("");

  const adicionarEspecialidade = () => {
    if (
      novaEspecialidade.trim() &&
      !specialties.includes(novaEspecialidade.trim())
    ) {
      setSpecialties([...specialties, novaEspecialidade.trim()]);
      setNovaEspecialidade("");
    }
  };

  const removerEspecialidade = (especialidade: string) => {
    setSpecialties(specialties.filter((e) => e !== especialidade));
  };

  const handleCancel = () => {
    form.reset();
    setSpecialties(["Residencial", "Comercial", "Luxury", "Investimentos"]);
    setNovaEspecialidade("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="w-60 h-8" />
          ) : (
            <>
              <Award className="w-5 h-5 text-primary" />
              Informações Profissionais
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            {loading ? (
              <>
                <Skeleton className="w-40 h-8 mt-4" />

                <Skeleton className="w-40 h-8 mt-8" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Data de Início na área</p>
                    <p className="text-muted-foreground">15 de Janeiro, 2020</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Especialidades</p>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início na área</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-60" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="font-medium mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="relative pr-8"
                    >
                      {specialty}
                      <button
                        type="button"
                        onClick={() => removerEspecialidade(specialty)}
                        className="absolute right-1 top-0 h-full flex items-center text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Residencial, Comercial..."
                    value={novaEspecialidade}
                    onChange={(e) => setNovaEspecialidade(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), adicionarEspecialidade())
                    }
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={adicionarEspecialidade}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

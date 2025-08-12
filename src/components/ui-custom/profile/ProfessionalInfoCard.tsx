// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Award, X, ChevronsUpDown, Check } from "lucide-react";

//Next
import { UseFormReturn } from "react-hook-form";

// Types
import { profileFormValues } from "@/lib/schemas/user/profileForm";

// Utils
import { dateFormatterOrFallback } from "@/lib/utils/formatters/dateFormatters";

// Hooks
import useSpecialtyForm from "@/hooks/useSpecialtiesForm";
import { Specialty } from "@/lib/schemas/user/specialty";

//Props
interface ProfessionalInfoCardProps {
  form: UseFormReturn<profileFormValues>;
  isEditing: boolean;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

//Component
export default function ProfessionalInfoCard({
  form,
  isEditing,
  loading,
  setLoading,
}: ProfessionalInfoCardProps) {
  const {
    allSpecialties,
    selectedSpecialties,
    addSpecialty,
    removeSpecialty,
    openSpecialtiesList,
    setOpenSpecialtiesList,
  } = useSpecialtyForm(form, setLoading);

  const { careerStartDate } = form.watch();
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
                    <p className="font-medium">Data de Início na Corretagem</p>
                    <p className="text-muted-foreground">
                      {dateFormatterOrFallback(careerStartDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Especialidades</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {selectedSpecialties && selectedSpecialties.length > 0
                      ? selectedSpecialties.map((specialty) => (
                          <Badge
                            key={specialty.id}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {specialty.name}
                          </Badge>
                        ))
                      : "Nenhuma especialidade definida"}
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
                name="careerStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início na Corretagem</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ?? ""}
                        className="w-60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="font-medium mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedSpecialties.map((specialty) => (
                    <Badge
                      key={specialty.id}
                      variant="secondary"
                      className="relative pr-8"
                    >
                      {specialty.name}
                      <button
                        type="button"
                        className="absolute right-1 top-0 h-full flex items-center text-muted-foreground hover:text-destructive"
                        onClick={() => removeSpecialty(specialty.id)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Popover
                    open={openSpecialtiesList}
                    onOpenChange={setOpenSpecialtiesList}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSpecialtiesList}
                        className="w-full justify-between"
                      >
                        Adicionar Especialidade
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar Especialidade..." />
                        <CommandList>
                          <CommandEmpty>
                            Nenhuma especialidade encontrada.
                          </CommandEmpty>
                          <CommandGroup>
                            {(() => {
                              const selectedIds = new Set(
                                selectedSpecialties.map((s) => s.id)
                              );

                              return allSpecialties
                                .filter((option) => !selectedIds.has(option.id))
                                .map((option) => (
                                  <CommandItem
                                    key={option.id}
                                    value={option.name}
                                    onSelect={() => addSpecialty(option.id)}
                                  >
                                    {option.name}
                                  </CommandItem>
                                ));
                            })()}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

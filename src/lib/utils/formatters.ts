import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// ---------------------------------------------- Gets a field value or return "Not provided" ----------------------------
export function getFieldValueOrFallback(
  value: any,
  fallback: string = "Não informado"
): string {
  return value ? String(value) : fallback;
}

// ------------------------------------------Formats a date if it's provided, else returns "Not provided" ----------------------------
export const formatDateOrFallback = (
  dateString: string | undefined | null,
  fallbackText: string = "Não informado"
) => {
  if (!dateString) return fallbackText;

  try {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  } catch {
    return fallbackText;
  }
};

// ----------------------------------- Maps genders recived from Enum and prepars it for display -------------------------------------
const genderDisplayMap = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  OUTROS: "Outros",
};

export const formatGender = (value: string) => {
  return genderDisplayMap[value as keyof typeof genderDisplayMap] || value;
};

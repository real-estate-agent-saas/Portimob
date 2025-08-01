import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getFieldValueOrFallback (value: any, fallback: string = "Não informado"): string {
  return value ? String(value) : fallback;
}

export const formatDateOrFallback = (
  dateString: string | undefined | null,
  fallbackText: string = "Não informado"
) => {
  if (!dateString) return fallbackText;
  
  try {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return fallbackText;
  }
};

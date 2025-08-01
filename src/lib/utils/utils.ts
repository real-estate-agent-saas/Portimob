import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInYears } from "date-fns";

// Utilitário para combinar classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para Calcular Data
export function calculateExperienceTime(careerStartDate: string | null | undefined): string {
  // Caso não tenha data
  if (!careerStartDate) return "0 anos de experiência";
  
  const years = differenceInYears(new Date(), new Date(careerStartDate));
  return `${years} ${years === 1 ? "ano" : "anos"} de experiência`;

}
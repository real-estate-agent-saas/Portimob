import { differenceInYears } from "date-fns";

//------------------------- Calculates Experience Time ---------------------------
export function calculateExperienceTime(
  careerStartDate: string | null | undefined
): string {
  // If there is no career start date
  if (!careerStartDate) return "0 anos de experiência";

  const years = differenceInYears(new Date(), new Date(careerStartDate));
  return `${years} ${years === 1 ? "ano" : "anos"} de experiência`;
}

//------------------------- Converts ISO Date to yyyy/mm/dd ---------------------------
export function extractDateFromISO(isoDate?: string | null): string | undefined {
  if (!isoDate) return undefined;
  return isoDate.split("T")[0];
}

//------------------------- Converts Date to ISO ---------------------------
export function convertDateToISO(date: string | undefined): string | undefined {
  if (!date) return undefined;
  return `${date}T00:00:00.000Z`;
}

// ------------------------------------------Formats a date if it's provided, else returns "Not provided" ----------------------------
export const dateFormatterOrFallback = (dateIsoString?: string) => {
  if (!dateIsoString) return "Nenhuma data definida";

  const date = new Date(dateIsoString);

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' // Converts date to UTC, preserving the original time
  }).format(date);
};
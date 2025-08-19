import IMask from "imask";

// ---------------------------------------------- Gets a field value or return "Not provided" ----------------------------
export function getFieldValueOrFallback(value: any, fallback: string = "Não informado"): string {
  if(value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
}

// ---------------------------------------------- Formats Whatsapp Number ----------------------------
export function whatsappFormatter(phoneNumber?: string) {
  // If phoneNumber is not provided, return an empty string
  if (!phoneNumber) return "";

  // Defines mask options for the phone number
  const maskOptions = { mask: "(00) 00000-0000" };
  const masked = IMask.createMask(maskOptions);

  // Masked contains the formatted phone number
  masked.resolve(phoneNumber);

  return masked.value;
}

// ---------------------------------------------- Formats Phone Number ----------------------------
export function phoneFormatter(phoneNumber?: string) {
  // If phoneNumber is not provided, return an empty string
  if (!phoneNumber) return "";

  // Defines mask options for the phone number
  const maskOptions = { mask: "(00) 0000-0000" };
  const masked = IMask.createMask(maskOptions);

  // Masked contains the formatted phone number
  masked.resolve(phoneNumber);

  return masked.value;
}

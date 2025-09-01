import IMask from "imask";

// ---------------------------------------------- Gets a field value or return "Not provided" ----------------------------
export function getFieldValueOrFallback(
  value: any,
  fallback: string = "Não informado"
): string {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
}

// ---------------------------------------------- Formats Whatsapp Number ----------------------------
export function whatsappFormatter(Whatsapp?: string) {
  // If phoneNumber is not provided, return an empty string
  if (!Whatsapp) return "";

  // Defines mask options for the phone number
  const maskOptions = { mask: "(00) 00000-0000" };
  const masked = IMask.createMask(maskOptions);

  // Masked contains the formatted phone number
  masked.resolve(Whatsapp);

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

export function priceFormatter(price?: number | null) {
  if (!price) return "";

  const maskOptions = {
    mask: Number, // Numeric Mask
    scale: 2, // decimal places
    signed: false, // No negative values
    thousandsSeparator: ".",
    radix: ",", // decimal separator
    padFractionalZeros: true, // Aways show 2 decimal places
  };

  const masked = IMask.createMask(maskOptions);

  // Resolve transforma o valor em string na máscara
  masked.resolve(price.toString());

  return masked.value;
}

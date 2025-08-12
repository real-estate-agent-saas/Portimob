import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// For classnames with Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
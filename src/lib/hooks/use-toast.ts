"use client"

import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (message: string, description?: string) =>
    sonnerToast.success(message, {
      description,
    }),

  error: (message: string, description?: string) =>
    sonnerToast.error(message, {
      description,
    }),

  info: (message: string, description?: string) =>
    sonnerToast(message, {
      description,
    }),

  custom: sonnerToast,
}

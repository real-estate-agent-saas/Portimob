// Next / React
import { useState, useEffect, useRef } from "react";

// Zod
import { z } from "zod";

// Icons
import { Globe, CheckCircle, XCircle, LucideIcon } from "lucide-react";

// Hooks
import { toast } from "@/lib/hooks/use-toast";

// Contants
import { RESERVED_SLUGS } from "@/lib/constants/reservedSlugs";

// Services
import {
  getCurrentSlug,
  checkSlugAvailability,
  updateSlug,
} from "@/api/websites/user-website/website";

export default function useSlug() {
  //------------------------------------------------------- States ----------------------------------------------------
  const [currentSlug, setCurrentSlug] = useState<string>(""); // Current slug
  const [slug, setSlug] = useState<string>(""); // Form value to be updated
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null); // Slug availability status
  const [validationError, setValidationError] = useState<string>(""); // Validation error messages
  const [checkingAvailability, setCheckingAvailability] =
    useState<boolean>(false); // While consulting the database
  const [loading, setLoading] = useState<boolean>(false); // For UI loading control


  // Message card
  const initialSlugStatus = {
    text: "Digite um slug",
    variant: "secondary" as const,
    icon: Globe,
  };

  const [slugStatus, setSlugStatus] = useState<{
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: LucideIcon;
  }>(initialSlugStatus);

  // For setTimeout
  const DEBOUNCE_DELAY = 1.5 * 1000;
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  //-------------------------------------------- (1) When page loads fetches user current slug -----------------------------------
  useEffect(() => {
    const fetchSlug = async () => {
      setLoading(true);
      try {
        const slugReponse = await getCurrentSlug();
        setCurrentSlug(slugReponse === "" ? "nao-definido" : slugReponse);
      } catch (e) {
        toast.error("Erro", "Não foi possível carregar o slug atual");
      } finally {
        setLoading(false);
      }
    };
    fetchSlug();
  }, []);

  //---------------------------------------------------- (2) Zod Validation Schema --------------------------------------
  const slugSchema = z
    .string()
    .min(1, "")
    .min(3, "O slug deve ter pelo menos 3 caracteres")
    .max(26, "O slug pode ter no máximo 26 caracteres")
    .regex(
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      "Use apenas letras minúsculas, números e hífens. Não pode começar com número ou hífen, nem terminar com hífen"
    )
    .refine((val) => !RESERVED_SLUGS.includes(val), {
      message: "Esse slug é uma palavra reservada",
    })
    .refine((val) => val !== currentSlug, {
      message: "Esse já é o seu slug",
    });

  //--------------------------- (3) If the slug passes all conditions, query whether the slug is available in the database.  ----------------------------
  const handleSlugChange = (value: string) => {
    setSlug(value); // Sets new slug
    setCheckingAvailability(true); // For verifying message
    setIsSlugAvailable(null);

    // Resets timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    // If any error on zod return before contact database
    const result = slugSchema.safeParse(value);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      setCheckingAvailability(false);
      return;
    }

    // Clean validation error message
    setValidationError("");

    // Executes after time finishes
    debounceRef.current = setTimeout(async () => {
      try {
        const isAvailable = await checkSlugAvailability(value);
        if (isAvailable === false) {
          setValidationError("Este slug já está em uso. Tente outro.");
        }
        setIsSlugAvailable(isAvailable);
      } catch (e) {
        console.error("Erro ao verificar disponibilidade:", e);
        setIsSlugAvailable(false);
      } finally {
        setCheckingAvailability(false);
      }
    }, DEBOUNCE_DELAY);
  };

  //---------------------------------------- (4) Alternate Badge messages based on the slug --------------------------------------

  useEffect(() => {
    if (checkingAvailability === true && !validationError) {
      return setSlugStatus({
        text: "Verificando...",
        variant: "default",
        icon: XCircle,
      });
    }

    if (isSlugAvailable === false) {
      return setSlugStatus({
        text: "Indisponível",
        variant: "destructive",
        icon: XCircle,
      });
    }

    if (isSlugAvailable === true) {
      return setSlugStatus({
        text: "Disponível",
        variant: "default",
        icon: CheckCircle,
      });
    }

    if (checkingAvailability === false) {
      return setSlugStatus(initialSlugStatus);
    }
  }, [validationError, checkingAvailability, isSlugAvailable]);

  //-------------------------------------------------------- (5) Saves new slug ---------------------------------------------
  const handleSaveSlug = async () => {
    setLoading(true);
    try {
      const updatedSlug = await updateSlug(slug);
      toast.success("Slug atualizado com sucesso!");
      setCurrentSlug(updatedSlug);
      setSlug(""); // Clear input after successful update
      setIsSlugAvailable(null);
      setValidationError("");
    } catch (e) {
      console.error("Erro ao atualizar slug", e);
      toast.error("Erro ao atualizar slug");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSaveSlug,
    handleSlugChange,
    currentSlug,
    slug,
    loading,
    slugStatus,
    validationError,
    isSlugAvailable,
    checkingAvailability,
  };
}

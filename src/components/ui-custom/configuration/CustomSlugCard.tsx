// Shadcn/ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Next / React
import { useState, useEffect } from "react";

// Zod
import { z } from "zod";

// Icons
import {
  AlertCircle,
  ExternalLink,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Hooks
import { toast } from "@/hooks/use-toast";

// Contants
import { RESERVED_SLUGS } from "@/lib/constants/reservedSlugs";

// Services
import {
  getSlug,
  updateSlug,
  checkSlugAvailability,
} from "@/services/user/profile";

// Slug card component
export function CustomSlugCard() {
  const [slug, setSlug] = useState<string>(""); // Slug to be updated
  const [currentSlug, setCurrentSlug] = useState<string>(""); // Current slug
  const [checkingAvailability, setCheckingAvailability] =
    useState<boolean>(false); // Availability check status
  const [validationError, setValidationError] = useState<string>(""); // Validation error message
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null); // Slug availability status
  const [loading, setLoading] = useState<boolean>(false);

  //------------------------------------------ (1) When page loads fetches user slug --------------------------------------
  useEffect(() => {
    const fetchSlug = async () => {
      setLoading(true);
      try {
        const response = await getSlug();
        setCurrentSlug(response?.slug ?? "nao-definido");
      } catch (e) {
        console.log("Não foi possível buscar o slug", e);
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
    .min(3, "O slug deve ter pelo menos 3 caracteres")
    .max(20, "O slug pode ter no máximo 20 caracteres")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use apenas letras minúsculas, números e hífens, sem começar/terminar com hífen"
    )
    .refine((val) => !RESERVED_SLUGS.includes(val), {
      message: "Esse slug é uma palavra reservada",
    });

  //-------------------------------------------------------- (3) Checks Availability ---------------------------------------------

  const checkAvailability = async () => {
    try {
      const isAvailable = await checkSlugAvailability({ slug: slug });
      setIsSlugAvailable(isAvailable);
      console.log(isAvailable);
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
      setIsSlugAvailable(false);
    } finally {
      setCheckingAvailability(false);
    }
  };

  // useEffect(() => {
  //   const checkAvailability = async () => {
  //     if (!slug || validationError) {
  //       setIsSlugAvailable(null);
  //       return;
  //     }

  //     setCheckingAvailability(true);
  //     try {
  //       const isAvailable = await checkSlugAvailability({slug: slug});
  //       setIsSlugAvailable(isAvailable);
  //     } catch (error) {
  //       console.error("Erro ao verificar disponibilidade:", error);
  //       setIsSlugAvailable(false);
  //     } finally {
  //       setCheckingAvailability(false);
  //     }
  //   };

  //   const timeoutId = setTimeout(checkAvailability, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [slug, validationError]);

  //-------------------------------------------------------- (4) Saves new slug ---------------------------------------------
  const handleSaveSlug = async () => {
    setLoading(true);
    try {
      console.log(slug);

      const isAvailable = await checkSlugAvailability({ slug: slug });

      if (isAvailable === false) {

         toast.error(
        "Slug já em uso",
        `Não é possível utilizar esse Slug`
      );
        return;
      }

      const updatedSlug = await updateSlug({ slug: slug });
      toast.success(
        "Slug atualizado com sucesso!",
        `Sua página agora está disponível em: https://${updatedSlug.slug}.imovelpro.com`
      );
      setCurrentSlug(updatedSlug.slug);
      setSlug(""); // Clear input after successful update
      setIsSlugAvailable(null);
      setValidationError("");
    } catch (e: any) {
      console.error("Erro ao atualizar slug", e);
      toast.error(
        "Erro ao atualizar",
        e.response?.data?.message || "Não foi possível atualizar o slug"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);

    // Reset validation and availability when input changes
    setIsSlugAvailable(null);

    // Validate with zod
    const result = slugSchema.safeParse(value);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
    } else {
      setValidationError("");
    }
  };

  // Slug status based on validation and availability
  const getSlugStatus = () => {
    if (validationError) {
      return {
        text: "Inválido",
        variant: "destructive" as const,
        icon: XCircle,
      };
    }

    if (isSlugAvailable === false) {
      return {
        text: "Indisponível",
        variant: "destructive" as const,
        icon: XCircle,
      };
    }

    if (isSlugAvailable === true) {
      return {
        text: "Disponível",
        variant: "default" as const,
        icon: CheckCircle,
      };
    }

    return {
      text: "Digite um slug",
      variant: "secondary" as const,
      icon: Globe,
    };
  };

  const slugStatus = getSlugStatus();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <CardTitle>URL Personalizada</CardTitle>
        </div>
        <CardDescription>
          Configure um subdomínio personalizado para sua página de imóveis para
          que visitantes possam acessar seu site.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rules */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Regras para o slug:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Mínimo de 3 caracteres</li>
              <li>• Apenas letras minúsculas, números e hífens</li>
              <li>• Não pode começar ou terminar com hífen</li>
              <li>
                • Palavras reservadas como "admin", "api", "www" não são
                permitidas
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Current URL */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">URL Atual</Label>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
            <span className="text-sm text-muted-foreground">https://</span>
            <Badge variant="outline" className="font-mono">
              {currentSlug}
            </Badge>
            <span className="text-sm text-muted-foreground">
              .imovelpro.com
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-6 w-6 p-0"
              onClick={() =>
                window.open(`localhost:3000/${currentSlug}.imovelpro.com`, "_blank")
              }
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Configurar Novo Slug */}
        <div className="space-y-4">
          <Label htmlFor="slug" className="text-sm font-medium">
            Nova URL Personalizada
          </Label>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">https://</span>
              <div className="flex-1 relative">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="meu-slug-personalizado"
                  className="font-mono pr-20"
                  maxLength={20}
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge
                    variant={slugStatus.variant}
                    className="text-xs flex items-center gap-1"
                  >
                    <slugStatus.icon className="h-3 w-3" />
                    {checkingAvailability ? "Verificando..." : slugStatus.text}
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                .imovelpro.com
              </span>
            </div>

            {/* Error messages */}
            {(validationError || isSlugAvailable === false) && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {validationError || "Este slug já está em uso. Tente outro."}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSaveSlug}
              disabled={
                !slug ||
                !!validationError ||
                isSlugAvailable === false ||
                loading
              }
              className="w-full sm:w-auto"
            >
              {loading ? "Salvando..." : "Salvar URL"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

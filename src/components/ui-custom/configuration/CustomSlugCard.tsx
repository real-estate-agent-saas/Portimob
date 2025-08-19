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
import { useState } from "react";

// Zod
import { z } from "zod";

// Icons
import { AlertCircle, Check, ExternalLink, Globe } from "lucide-react";

// Hooks
import { toast } from "@/hooks/use-toast";

// Slug card component
export function CustomSlugCard() {
  const [slug, setSlug] = useState(""); // Slug to be updated
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null); // Slug availability status
  const [isChecking, setIsChecking] = useState(false); // Slug checking status
  const [currentSlug, setCurrentSlug] = useState<string>("nao-definido"); // Current slug

  const handleSlugChange = (value: string) => {
    // Remove caracteres especiais e espaços, converte para lowercase
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-");
    setSlug(cleanSlug);

    if (cleanSlug !== value) {
      // Mostra formatação automática
      toast.info(
        "Slug formatado automaticamente",
        "O slug foi formatado automaticamente para seguir as regras de URL"
      );
    }
  };

  const handleSaveSlug = () => {
    if (!isSlugAvailable || !slug) return;

    // Aqui seria feita a chamada para a API
    setCurrentSlug(slug);
    toast.success(
      "Slug atualizado com sucesso!",
      `Sua página agora está disponível em: ${slug}.imovelpro.com`
    );
    setSlug("");
    setIsSlugAvailable(null);
  };

  const getSlugStatus = () => {
    if (!slug) return null;
    if (isChecking)
      return {
        icon: AlertCircle,
        text: "Verificando...",
        variant: "secondary" as const,
      };
    if (isSlugAvailable)
      return { icon: Check, text: "Disponível", variant: "default" as const };
    return {
      icon: AlertCircle,
      text: "Indisponível",
      variant: "destructive" as const,
    };
  };
  const slugStatus = getSlugStatus();

  // Zod Validation Schema
  const slugSchema = z
    .string()
    .min(3, "O slug deve ter pelo menos 3 caracteres")
    .max(50, "O slug pode ter no máximo 50 caracteres")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use apenas letras minúsculas, números e hífens, sem começar/terminar com hífen"
    )
    .refine((val) => !["admin", "api", "www"].includes(val), {
      message: "Esse slug é uma palavra reservada",
    });

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
            <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
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
                  className="font-mono"
                  maxLength={50}
                />
                {slugStatus && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Badge variant={slugStatus.variant} className="text-xs">
                      <slugStatus.icon className="h-3 w-3 mr-1" />
                      {slugStatus.text}
                    </Badge>
                  </div>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                .imovelpro.com
              </span>
            </div>

            {slug && (
              <Button
                onClick={handleSaveSlug}
                disabled={!isSlugAvailable || isChecking}
                className="w-full sm:w-auto"
              >
                {isChecking ? "Verificando..." : "Salvar URL"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

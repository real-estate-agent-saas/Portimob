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

// Icons
import { AlertCircle, ExternalLink, Globe } from "lucide-react";

// Custom Hook
import useSlug from "@/hooks/user/useSlug";

export function CustomSlugCard() {
  // Custom Hook data
  const {
    handleSaveSlug,
    handleSlugChange,
    currentSlug,
    slug,
    loading,
    slugStatus,
    validationError,
    isSlugAvailable,
    checkingAvailability,
  } = useSlug();

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
        <Alert className="flex">
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
                window.open(`http://localhost:3000/${currentSlug}`, "_blank")
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
                    {slugStatus.text}
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                .imovelpro.com
              </span>
            </div>

            {/* Error messages */}
            {(validationError || isSlugAvailable === false) && (
              <Alert variant="destructive" className="py-2 flex">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {validationError}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSaveSlug}
              disabled={
                slug === "" ||
                Boolean(validationError) ||
                checkingAvailability === true ||
                isSlugAvailable === false
              }
              variant={"black"}
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

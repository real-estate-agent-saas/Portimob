"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, Check, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { TemplateReponse } from "@/lib/models/templates/templates.model";
import { useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "@/api/templates/templates";

const Templates = () => {
  const {
    data: templates,
    isLoading,
    error,
  } = useQuery<TemplateReponse[]>({
    queryKey: ["templates"],
    queryFn: getAllTemplates,
  });

  console.log(templates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleConfigure = () => {
    if (selectedTemplate) {
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-12 px-6 rounded-lg shadow-lg">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Layout className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Escolha seu Template</h1>
              </div>
              <p className="text-primary-foreground/90 text-lg">
                Selecione o design que melhor representa seu estilo profissional
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {templates?.map((template) => (
            <Card
              key={template.templateCode}
              className={`shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedTemplate === template.templateCode
                  ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                  : ""
              }`}
              onClick={() => handleSelectTemplate(template.templateCode)}
            >
              <CardHeader className="pb-4">
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {template.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mb-3">
                      {template.plan}
                    </Badge>
                  </div>
                  {selectedTemplate === template.templateCode && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <CardDescription className="text-base">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Recursos inclusos:
                  </p>
                  <ul className="space-y-1">
                    {template?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={
                    selectedTemplate === template.templateCode
                      ? "default"
                      : "outline"
                  }
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTemplate(template.templateCode);
                  }}
                >
                  {selectedTemplate === template.templateCode
                    ? "Selecionado"
                    : "Selecionar Template"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="flex justify-center sticky bottom-6">
            <Button
              size="lg"
              onClick={handleConfigure}
              className="shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Layout className="w-5 h-5 mr-2" />
              Configurar Template Selecionado
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;

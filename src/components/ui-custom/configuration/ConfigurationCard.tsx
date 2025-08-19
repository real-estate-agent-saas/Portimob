import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function ConfigurationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outras Configurações</CardTitle>
        <CardDescription>
          Configurações adicionais serão implementadas em breve
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p>Novas opções de configuração em desenvolvimento...</p>
        </div>
      </CardContent>
    </Card>
  );
}

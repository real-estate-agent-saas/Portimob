// Shadcn/ui components
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Configure seu site na plataforma Imóvel Pro!
        </p>
      </div>

      <Separator />
    </>
  );
}

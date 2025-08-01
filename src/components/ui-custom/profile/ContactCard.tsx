// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Phone, Mail, MessageCircle } from "lucide-react";

// Hooks, Types and Utils
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/types/profileFormData";
import { getFieldValueOrFallback } from "@/lib/utils/formatters";

// Interface
interface ContactCardProps {
  form: UseFormReturn<ProfileFormData>;
  isEditing: boolean;
  loading: boolean;
}

export default function ContactCard({
  form,
  isEditing,
  loading,
}: ContactCardProps) {
  return (
    <Card>
      <CardHeader>
        {loading ? (
          <Skeleton className="w-60 h-8" />
        ) : (
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Informações de Contato
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            <div className="flex items-center gap-3">
              {loading ? (
                <Skeleton className="w-40 h-8 " />
              ) : (
                <>
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      {getFieldValueOrFallback(form.watch("publicEmail"))}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              {loading ? (
                <Skeleton className="w-40 h-8 " />
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">
                      {getFieldValueOrFallback(form.watch("whatsapp"))}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              {loading ? (
                <Skeleton className="w-40 h-8 " />
              ) : (
                <>
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">
                      {getFieldValueOrFallback(form.watch("phone"))}
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <Form {...form}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="publicEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(11) 99999-9999" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(11) 3333-4444" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

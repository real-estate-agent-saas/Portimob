// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../ui/skeleton";
import { CustomInputMasked } from "@/components/ui/custom-imask-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Phone, Mail, MessageCircle } from "lucide-react";

// Hooks
import { UseFormReturn } from "react-hook-form";

// Schema
import { profileFormValues } from "@/lib/schemas/user/profileForm";

// Formatters
import {
  getFieldValueOrFallback,
  whatsappFormatter,
  phoneFormatter
} from "@/lib/formatters/UIformatters";

// Interface
interface ContactCardProps {
  form: UseFormReturn<profileFormValues>;
  isEditing: boolean;
  loading: boolean;
}

export default function ContactCard({
  form,
  isEditing,
  loading,
}: ContactCardProps) {
  //Form values to show
  const { publicEmail, whatsapp, phone } = form.watch();

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
                      {getFieldValueOrFallback(publicEmail)}
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
                      {getFieldValueOrFallback(whatsappFormatter(whatsapp))}
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
                      {getFieldValueOrFallback(phoneFormatter(phone))}
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
                      <Input
                        type="email"
                        {...field}
                        placeholder="corretor@email.com"
                      />
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
                      <CustomInputMasked
                        mask="(00) 00000-0000"
                        value={field.value}
                        onAccept={(value, mask) =>
                          field.onChange(mask.unmaskedValue)
                        }
                        placeholder="(11) 99999-9999"
                        type="tel"
                      />
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
                      <CustomInputMasked
                        mask="(00) 0000-0000"
                        value={field.value}
                        onAccept={(value, mask) =>
                          field.onChange(mask.unmaskedValue)
                        }
                        placeholder="(11) 3333-4444"
                        type="tel"
                      />
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

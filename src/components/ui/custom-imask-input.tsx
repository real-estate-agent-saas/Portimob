import * as React from "react";
import { Input } from "@/components/ui/input"; // Component to copy styles
import { cn } from "@/lib/utils/utils"; // Lib for style Tailwind
import { IMaskInput } from "react-imask"; // Component to copy props

// Extrai o className padrão do Input do shadcn
const inputBaseClasses = Input({ className: "" }).props.className;

type InputMaskedProps = React.ComponentProps<typeof IMaskInput> & {
  className?: string;
};

const CustomInputMasked = React.forwardRef<HTMLInputElement, InputMaskedProps>(
  ({ className, ...props }, ref) => {
    return (
      <IMaskInput
        {...props}
        inputRef={ref}
        className={cn(
          inputBaseClasses, // Classes base do Input do shadcn
          className // Classes adicionais passadas como prop
        )}
      />
    );
  }
);

CustomInputMasked.displayName = "CustomInputMasked";

export { CustomInputMasked };
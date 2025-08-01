type PasswordValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validatePassword = (
  password: string
): PasswordValidationResult => {
  // Verifica se é string
  if (typeof password !== "string") {
    return {
      isValid: false,
      message: "A senha deve ser um texto",
    };
  }

  // Verifica comprimento mínimo
  if (password.length < 8) {
    return {
      isValid: false,
      message: "A senha deve ter no mínimo 8 caracteres.",
    };
  }

  // Verifica comprimento máximo
  if (password.length > 20) {
    return {
      isValid: false,
      message: "A senha deve ter no máximo 20 caracteres.",
    };
  }

  // Verifica complexidade
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);

  if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar) {
    return {
      isValid: false,
      message:
        "A senha deve conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
    };
  }

  // Se passou por todas as validações
  return {
    isValid: true,
  };
};
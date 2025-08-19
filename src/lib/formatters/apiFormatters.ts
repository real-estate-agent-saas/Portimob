// ----------------------------------- Converts empty strings from obj into null -------------------------------------

export const convertEmptyStringsToNull = (obj: Record<string, any>) => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === "") {
      newObj[key] = null;
    }
  }
  return newObj;
};

// ----------------------------------- Maps genders recived from Enum and prepars it for display -------------------------------------
const genderDisplayMap = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  OUTROS: "Outros",
};

export const formatGender = (value: string) => {
  return genderDisplayMap[value as keyof typeof genderDisplayMap] || value;
};
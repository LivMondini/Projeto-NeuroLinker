export const validators = {
  medication: (data: any) => {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) errors.name = "Nome obrigatório";
    if (!data.time) errors.time = "Horário obrigatório";
    if (!data.dosage?.trim()) errors.dosage = "Dosagem obrigatória";
    if (!data.period) errors.period = "Período obrigatório";

    return { isValid: Object.keys(errors).length === 0, errors };
  },
};

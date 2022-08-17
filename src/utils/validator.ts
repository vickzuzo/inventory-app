export type ValidationType = Record<
  string,
  (...args: (string | any)[]) => string | undefined
>;

export const validators: ValidationType = {
  title: (value: string) => {
    if (value.length === 0) return "Title is required";
    return "";
  },
  category: (value: string) => {
    if (value.length === 0) return "Category is required";
    return "";
  },
  purchasePrice: (value: string) => {
    if (value.length === 0) return "Purchase Price is required";
    return "";
  },
  description: (value: string) => {
    return "";
  },
};

const validateFormSubmit = (form: Record<string, string>) => {
  const errors: any = {};
  let isValid = true;
  Object.keys(form).forEach((key) => {
    const error = validators[key](form[key]);
    errors[key] = error;
    if (error) {
      isValid = false;
    }
  });

  return { errors, isValid };
};

export const checkFormValid = (
  form: Record<string, string>,
  setFormError?: any
) => {
  const { isValid, errors } = validateFormSubmit(form);

  if (setFormError) {
    setFormError(errors);
  }

  return isValid;
};

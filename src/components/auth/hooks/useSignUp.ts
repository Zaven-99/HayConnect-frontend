import { useForm, useWatch } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";

export const useSignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IFormValues>({
    defaultValues: {
      name: "",
      lastName: "",
      day: "",
      month: "",
      year: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const password = useWatch({ control, name: "password" });

  return {
    register,
    errors,
    reset,
    handleSubmit,
    password,
  };
};

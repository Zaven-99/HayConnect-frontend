import { useForm } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";

export const useResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
  };
};

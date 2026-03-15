import { useForm } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";

export const useSignin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};

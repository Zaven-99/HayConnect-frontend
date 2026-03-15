import type { IFormValues } from "../types/auth.types";
import { useForm } from "react-hook-form";

export const useSendEmail = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    register,
    errors,
    reset,
    handleSubmit,
  };
};

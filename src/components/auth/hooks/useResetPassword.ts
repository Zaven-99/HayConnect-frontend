import { useForm, type SubmitHandler } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";

export const useResetPassword = (
  handleResetPassword: (data: IFormValues, reset: () => void) => void,
) => {
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    handleResetPassword(data, reset);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

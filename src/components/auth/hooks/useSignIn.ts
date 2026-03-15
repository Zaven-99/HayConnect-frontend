import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";

export const useSignin = (
  handleLogin: (data: IFormValues, reset: () => void) => void,
) => {
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    handleLogin(data, reset);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

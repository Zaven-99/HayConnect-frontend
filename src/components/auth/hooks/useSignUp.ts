import { useForm, useWatch } from "react-hook-form";
import type { IFormValues } from "../types/auth.types";
import type { SubmitHandler } from "react-hook-form";

export const useSignUp = (
  handleSignUp: (data: IFormValues, reset: () => void) => void,
) => {
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    handleSignUp(data, reset);
  };

  return {
    register,
    errors,
    onSubmit,
    handleSubmit,
    password,
  };
};

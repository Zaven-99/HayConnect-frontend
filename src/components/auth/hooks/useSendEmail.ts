import type { IFormValues } from "../types/auth.types";
import { useForm, type SubmitHandler } from "react-hook-form";

export const useSendEmail = (
  handleSendEmail: (data: IFormValues, reset: () => void) => void,
) => {
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    handleSendEmail(data, reset);
  };

  return {
    register,
    errors,
    onSubmit,
    handleSubmit,
  };
};

import Form from "../form/Form";
import Button from "../../button/Button";
import Input from "../../input/Input";
import styles from "./emailForm.module.scss";
import { useSendEmail } from "../hooks/useSendEmail";
import type { IFormValues } from "../types/auth.types";

interface EmailFormProps {
  handleSendEmail: (data: IFormValues, reset: () => void) => void;
}

const EmailForm = ({ handleSendEmail }: EmailFormProps) => {
  const { register, errors, handleSubmit, reset } = useSendEmail();
  return (
    <Form onSubmit={handleSubmit((data) => handleSendEmail(data, reset))}>
      <h4 className={styles["emailForm-title"]}>Reset password</h4>
      <label className={styles["form-label"]} htmlFor="email">
        Email
      </label>

      <Input
        label="Email"
        placeholder="Enter e-mail"
        type="email"
        className={`${styles["form-control"]} ${errors.email ? styles.invalidBorder : ""}`}
        {...register("email", {
          required: "Please Enter Your Email",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Email is not valid",
          },
        })}
        error={errors.email}
      />
      <div className={styles["btn-wrapper"]}>
        <Button
          type="submit"
          className={styles["submit-button"]}
          label="Reset"
        />
      </div>
    </Form>
  );
};

export default EmailForm;

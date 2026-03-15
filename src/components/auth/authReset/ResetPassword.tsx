import Form from "../form/Form";
import Input from "../../input/Input";
import Button from "../../button/Button";
import styles from "./ResetPassword.module.scss";
import { useResetPassword } from "../hooks/useResetPassword";
import type { IFormValues } from "../types/auth.types";

interface ResetPasswordProps {
  handleResetPassword: (data: IFormValues, reset: () => void) => void;
}

const ResetPassword = ({ handleResetPassword }: ResetPasswordProps) => {
  const { register, handleSubmit, onSubmit, errors } =
    useResetPassword(handleResetPassword);

  return (
    <div className={styles["resetPassword"]}>
      <div className={styles["resetPassword-container"]}>
        <div className={styles["resetPassword-container__inner"]}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4 className={styles["reset-title"]}>Reset password</h4>
            <label className={styles["form-label"]} htmlFor="email">
              Password
            </label>
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              className={`${styles["form-control"]} ${errors.password ? styles.invalidBorder : ""}`}
              {...register("password", {
                required: "Please Enter Your Password",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
                },
              })}
              error={errors.password}
            />

            <div className={styles["btn-wrapper"]}>
              <Button
                type="submit"
                className={styles["submit-button"]}
                label="Reset"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

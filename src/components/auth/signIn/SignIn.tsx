import type { IFormValues } from "../types/auth.types";
import { FaLock } from "react-icons/fa";

import Input from "../../input/Input";
import Button from "../../button/Button";

import styles from "./signIn.module.scss";

import { useSignin } from "../hooks/useSignIn";
import AuthFooter from "../authFooter/AuthFooter";
import Form from "../form/Form";
import FormContainer from "../form/formContainer/FormContainer";

interface SignInProps {
  toggleSwitch: (formType: string) => void;
  handleLogin: (data: IFormValues, reset: () => void) => void;
  error?: string | null;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
}

const SignIn = ({
  toggleSwitch,
  handleLogin,
  error,
  rememberMe,
  setRememberMe,
}: SignInProps) => {
  const { register, handleSubmit, errors, reset } = useSignin();
  return (
    <>
      <FormContainer>
        <h4 className={styles["signIn-title"]}>Welcome Back !</h4>
        <p className={styles["signIn-subtitle"]}>
          Sign in to continue to HayConnect.
        </p>

        <Form onSubmit={handleSubmit((data) => handleLogin(data, reset))}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles["form-label"]} htmlFor="username">
            Email
          </label>
          <Input
            label="Email"
            placeholder="E-mail"
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
          <label className={styles["form-label"]} htmlFor="">
            Password
          </label>
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            className={`${styles["form-control"]} ${errors.password ? styles.invalidBorder : ""}`}
            {...register("password", {
              required: "Please Enter Your Password",
            })}
            error={errors.password}
          />

          <div className={styles["form-actions"]}>
            <div className={styles["form-check"]}>
              <input
                className={styles["form-check__input"]}
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                className={styles["form-check__label"]}
                htmlFor="customControlInline"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className={styles["submit-button"]}
              label="Log in"
            />
          </div>
        </Form>

        <div className={styles["forgot-password"]}>
          <FaLock size={10} color="#adb5bdbf" />
          <span onClick={() => toggleSwitch("forgot")}>
            forgot your password ?
          </span>
        </div>
        <AuthFooter
          text="Don't have an account ?"
          link="Sign up Now"
          toggleSwitch={toggleSwitch}
          arg="signup"
        />
      </FormContainer>
    </>
  );
};

export default SignIn;

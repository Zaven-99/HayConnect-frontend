import { useSignUp } from "../hooks/useSignUp";
import Input from "../../input/Input";
import Button from "../../button/Button";
import Form from "../form/Form";
import AuthFooter from "../authFooter/AuthFooter";

import styles from "./signUp.module.scss";
import DateOfBirth from "../dateOfBirth/DateOfBirth";
import type { IFormValues } from "../types/auth.types";
import { FaArrowDown } from "react-icons/fa";

interface SignUpProps {
  toggleSwitch: (formType: string) => void;
  handleSignUp: (data: IFormValues, reset: () => void) => void;
  error?: string;
}

const SignUp = ({ toggleSwitch, handleSignUp }: SignUpProps) => {
  const { register, errors, handleSubmit, onSubmit, password } =
    useSignUp(handleSignUp);
  return (
    <div className={styles["signUp"]}>
      <div className={styles["signUp-container"]}>
        <div className={styles["signUp-container_inner"]}>
          <h4 className={styles["auth-title"]}>Free Register</h4>
          <p className={styles["auth-subtitle"]}>
            Get your free HayConnect account now.
          </p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <label className={styles["form-label"]} htmlFor="name">
              Name
            </label>
            <Input
              label="name"
              placeholder="Name"
              type="text"
              className={`${styles["form-control"]} ${errors.name ? styles.invalidBorder : ""}`}
              {...register("name", {
                required: "Please Enter Your name",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
              error={errors.name}
            />
            <label className={styles["form-label"]} htmlFor="lastName">
              Last name
            </label>
            <Input
              label="lastName"
              placeholder="Last name"
              type="text"
              className={`${styles["form-control"]} ${errors.lastName ? styles.invalidBorder : ""}`}
              {...register("lastName", {
                required: "Please Enter Your Last name",
                minLength: {
                  value: 5,
                  message: "Last name must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Last name cannot exceed 20 characters",
                },
              })}
              error={errors.lastName}
            />
            <DateOfBirth errors={errors} register={register} />
            <label className={styles["form-label"]} htmlFor="email">
              Email
            </label>
            <Input
              label="email"
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
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
                },
              })}
              error={errors.password}
            />
            <label className={styles["form-label"]} htmlFor="">
              Confirm password
            </label>
            <Input
              label="confirmPassword"
              placeholder="Confirm password"
              type="password"
              className={`${styles["form-control"]} ${errors.password ? styles.invalidBorder : ""}`}
              {...register("confirmPassword", {
                required: "Please Enter Your Password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />
            <label className={styles["form-label"]} htmlFor="">
              Gender
            </label>
            <div className={styles["select-wrapper"]}>
              <select
                {...register("gender", { required: "Please select gender" })}
                className={errors.gender ? styles.invalidBorder : ""}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className={styles.arrow}>
                <FaArrowDown />
              </span>
            </div>
            <div className={styles["btn-wrapper"]}>
              <Button
                type="submit"
                className={styles["submit-button"]}
                label="Register"
              />
            </div>
          </Form>
        </div>
      </div>

      <AuthFooter
        text="Already have an account ?"
        link="Sign in"
        toggleSwitch={toggleSwitch}
        arg="signin"
      />
    </div>
  );
};

export default SignUp;

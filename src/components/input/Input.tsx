import type { FieldError } from "react-hook-form";
import { AiOutlineExclamation } from "react-icons/ai";

import React from "react";

import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, className, error, ...props }, ref) => {
    return (
      <div className={styles["input"]}>
        <input
          {...props}
          ref={ref}
          className={className}
          placeholder={placeholder}
          type={type}
        />

        {error && <div className={styles.error}>{error.message}</div>}
        {error && (
          <span className={styles.errorIcon}>
            <AiOutlineExclamation />
          </span>
        )}
      </div>
    );
  },
);

export default Input;

import type { FormHTMLAttributes, ReactNode } from "react";
import styles from "./form.module.scss";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit, ...props }: FormProps) => {
  return (
    <form {...props} onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

export default Form;

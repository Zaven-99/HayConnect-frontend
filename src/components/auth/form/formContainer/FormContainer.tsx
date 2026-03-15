import type { ReactNode } from "react";
import styles from "./formContainer.module.scss";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div>
      <div className={styles["form"]}>
        <div className={styles["form-container"]}>
          <div className={styles["form-container_inner"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;

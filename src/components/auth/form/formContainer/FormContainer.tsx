import type { ReactNode } from "react";
import styles from "./formContainer.module.scss";
import animationStyles from "../../../../styles/animation.module.scss";
import clsx from "clsx";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div>
      <div className={clsx(styles["form"], animationStyles["modal-opening"])}>
        <div className={styles["form-container"]}>
          <div className={styles["form-container_inner"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;

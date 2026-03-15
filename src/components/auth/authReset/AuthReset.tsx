import AuthFooter from "../authFooter/AuthFooter";
import type { IFormValues } from "../types/auth.types";
import styles from "./authReset.module.scss";
import EmailForm from "./EmailForm";
interface AuthResetProps {
  toggleSwitch: (formType: string) => void;
  handleSendEmail: (data: IFormValues, reset: () => void) => void;
  message: string | null;
}

const AuthReset = ({
  toggleSwitch,
  handleSendEmail,
  message,
}: AuthResetProps) => {
  return (
    <div className={styles["authReset"]}>
      <div className={styles["authReset-container"]}>
        <div className={styles["authReset-container__inner"]}>
          {!message ? (
            <EmailForm handleSendEmail={handleSendEmail} />
          ) : (
            <div className={styles["successMessage"]}>
              <h4 className={styles["message-title"]}>{message}</h4>
            </div>
          )}
        </div>
      </div>

      <AuthFooter
        text="Remember it ?"
        link="Sign in here"
        toggleSwitch={toggleSwitch}
        arg="signin"
      />
    </div>
  );
};

export default AuthReset;

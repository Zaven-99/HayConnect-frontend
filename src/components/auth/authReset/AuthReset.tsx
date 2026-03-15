import AuthFooter from "../authFooter/AuthFooter";
import FormContainer from "../form/formContainer/FormContainer";
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
    <FormContainer>
      {!message ? (
        <>
          <EmailForm handleSendEmail={handleSendEmail} />
          <AuthFooter
            text="Remember it ?"
            link="Sign in here"
            toggleSwitch={toggleSwitch}
            arg="signin"
          />
        </>
      ) : (
        <div className={styles["successMessage"]}>
          <h4 className={styles["message-title"]}>{message}</h4>
        </div>
      )}
    </FormContainer>
  );
};

export default AuthReset;

import { useAuth } from "./hooks/useAuth";

import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

import styles from "./auth.module.scss";
import AuthReset from "./authReset/AuthReset";
import { FaSpinner } from "react-icons/fa";

const Auth = () => {
  const {
    formType,
    toggleSwitch,
    handleLogin,
    handleSignUp,
    handleSendEmail,
    setRememberMe,
    error,
    rememberMe,
    message,
    loading,
  } = useAuth();

  return (
    <div className={styles.auth}>
      {formType === "signup" && (
        <SignUp toggleSwitch={toggleSwitch} handleSignUp={handleSignUp} />
      )}

      {formType === "signin" && (
        <SignIn
          toggleSwitch={toggleSwitch}
          handleLogin={handleLogin}
          error={error}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}
      {loading && <FaSpinner className={styles.spinner} />}
      {formType === "forgot" && (
        <AuthReset
          toggleSwitch={toggleSwitch}
          handleSendEmail={handleSendEmail}
          message={message}
        />
      )}
    </div>
  );
};

export default Auth;

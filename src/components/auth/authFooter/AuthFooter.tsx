import { FaHeart } from "react-icons/fa";

import styles from "./authFooter.module.scss";

interface AuthFooterProps {
  text: string;
  link: string;
  toggleSwitch: (formType: string) => void;
  arg: string;
}

const AuthFooter = ({ text, link, arg, toggleSwitch }: AuthFooterProps) => {
  return (
    <div className={styles["auth-footer"]}>
      <p className={styles["auth-footer__text"]}>
        {text}{" "}
        <span
          className={styles["auth-footer__link"]}
          onClick={() => toggleSwitch(arg)}
        >
          {link}
        </span>
      </p>
      <p className={styles["auth-footer__copyright"]}>
        © HayConnect <FaHeart size={10} color="red" />
      </p>
    </div>
  );
};

export default AuthFooter;

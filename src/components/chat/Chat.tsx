import styles from "./chat.module.scss";
import animationStyles from "../../styles/animation.module.scss";
import { useHeader } from "../header/hooks/useHeader";
import Button from "../button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ChatProps {
  isClosing: boolean;
}

const Chat = ({ isClosing }: ChatProps) => {
  const { handleChatClick } = useHeader();

  return (
    <div
      className={`${styles.chat} ${
        isClosing ? animationStyles["closeChat"] : animationStyles["openChat"]
      }`}
    >
      <Button
        onClick={handleChatClick}
        label={<IoIosCloseCircleOutline />}
        className={styles["close-btn"]}
        type="button"
      />
    </div>
  );
};

export default Chat;

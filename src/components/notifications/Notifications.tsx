import { useHeader } from "../header/hooks/useHeader";
import styles from "./notifications.module.scss";
import animationStyles from "../../styles/animation.module.scss";
import Button from "../button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
interface NotificationsProps {
  isClosing: boolean;
}

const Notifications = ({ isClosing }: NotificationsProps) => {
  const { handleNotificationsClick } = useHeader();

  return (
    <div
      className={`${styles.notifications} ${
        isClosing
          ? animationStyles["closeNotifications"]
          : animationStyles["openNotifications"]
      }`}
    >
      <Button
        onClick={handleNotificationsClick}
        label={<IoIosCloseCircleOutline />}
        className={styles["close-btn"]}
        type="button"
      />
    </div>
  );
};

export default Notifications;

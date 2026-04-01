import { RiHomeFill } from "react-icons/ri";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiSolidMessage } from "react-icons/bi";

import styles from "./navigation.module.scss";
import UserMenu from "./userMenu/UserMenu";
import { useHeader } from "./hooks/useHeader";
import { IoNotifications } from "react-icons/io5";
import UserIcon from "../userIcon/UserIcon";

const Navigation = () => {
  const {
    isNotificationsOpen,
    avatar,
    isChatOpen,
    menu,
    handleChatClick,
    hanleMenuClick,
    handleNotificationsClick,
    isUserMenuOpen,
  } = useHeader();

  return (
    <ul className={styles.navigation} onClick={(e) => e.stopPropagation()}>
      <NavLink to="/main">
        {({ isActive }) => (
          <li className={isActive ? styles.active : ""}>
            <div className={styles["icon-wrapper"]}>
              <RiHomeFill className={styles.icon} />
            </div>
          </li>
        )}
      </NavLink>

      <NavLink to="/friends">
        {({ isActive }) => (
          <li className={isActive ? styles.active : ""}>
            <div className={styles["icon-wrapper"]}>
              <FaUserFriends className={styles.icon} />
            </div>
          </li>
        )}
      </NavLink>

      <li className={isNotificationsOpen ? styles.active : ""}>
        <div
          onClick={handleNotificationsClick}
          className={styles["icon-wrapper"]}
        >
          <IoNotifications className={styles.icon} />
        </div>
      </li>

      <li className={isChatOpen ? styles.active : ""}>
        <div onClick={handleChatClick} className={styles["icon-wrapper"]}>
          <BiSolidMessage className={styles.icon} />
        </div>
      </li>

      <div className={styles.user}>
        <li className={isUserMenuOpen ? styles.active : ""}>
          <div className={styles["icon-wrapper"]}>
            <UserIcon
              avatar={avatar}
              onClick={hanleMenuClick}
              icon={<FaUser className={styles.icon} />}
            />
          </div>
        </li>

        {(isUserMenuOpen || menu.isClosing) && (
          <UserMenu isClosing={menu.isClosing} />
        )}
      </div>
    </ul>
  );
};

export default Navigation;

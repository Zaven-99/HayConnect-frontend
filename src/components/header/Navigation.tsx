import { RiHomeFill } from "react-icons/ri";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiSolidMessage } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import styles from "./navigation.module.scss";
import UserMenu from "./userMenu/UserMenu";
import { useHeader } from "./hooks/useHeader";
import { IoNotifications } from "react-icons/io5";
import { useClosing } from "../../../utils/useClosing";

const Navigation = () => {
  const avatar = useSelector((state: RootState) => state.user.user?.avatar);
  const { showMenu, setShowMenu } = useHeader();
  const { isClosing, handleClose } = useClosing(() => setShowMenu(!showMenu));
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

      <NavLink to="/notifications">
        {({ isActive }) => (
          <li className={isActive ? styles.active : ""}>
            <div className={styles["icon-wrapper"]}>
              <IoNotifications className={styles.icon} />
            </div>
          </li>
        )}
      </NavLink>

      <NavLink to="/messages">
        {({ isActive }) => (
          <li className={isActive ? styles.active : ""}>
            <div className={styles["icon-wrapper"]}>
              <BiSolidMessage className={styles.icon} />
            </div>
          </li>
        )}
      </NavLink>
      <div className={styles.user}>
        {avatar ? (
          <li>
            <div
              onClick={() => {
                setTimeout(() => setShowMenu(!showMenu), 300);
                handleClose();
              }}
              className={styles["icon-wrapper"]}
            >
              <img src={avatar} alt="" />
            </div>
          </li>
        ) : (
          <li>
            <div
              onClick={() => {
                setTimeout(() => setShowMenu(!showMenu), 300);
                handleClose();
              }}
              className={styles["icon-wrapper"]}
            >
              <FaUser className={styles.icon} />
            </div>
          </li>
        )}
        {showMenu && <UserMenu isClosing={isClosing} />}
      </div>
    </ul>
  );
};

export default Navigation;

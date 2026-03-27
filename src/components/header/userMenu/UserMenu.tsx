import { NavLink } from "react-router-dom";
import styles from "./userMenu.module.scss";
import { useLogout } from "../hooks/useLogout";

import { IoLogOutSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import clsx from "clsx";
import animationStyles from "../../../styles/animation.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface UserMenuProps {
  isClosing: boolean;
  userId?: number;
}

const UserMenu = ({ isClosing, userId }: UserMenuProps) => {
  const { handleLogout } = useLogout();

  const currentUser = useSelector((state: RootState) => state.user.user);
  const viewedUser = useSelector((state: RootState) => state.user.viewedUser);

  const user = userId ? viewedUser : currentUser;
  return (
    <div
      className={clsx(
        styles["user-menu"],
        isClosing ? animationStyles["fadeOut"] : animationStyles["fadeIn"],
      )}
    >
      <div className={styles["user-menu__container"]}>
        <ul className={styles["user-menu__list"]}>
          <li className={styles["user-item"]}>
            <span className={styles["user-name"]}>
              {user?.name} {user?.lastName}
            </span>

            <span className={styles["rating"]}>
              {user?.ratingAvg ? user.ratingAvg.toFixed(1) : "—"}
            </span>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles["user-item__link"]} ${isActive ? styles.active : ""}`
              }
            >
              <ImProfile />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <button
              className={styles["user-item__link"]}
              onClick={handleLogout}
            >
              <IoLogOutSharp />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;

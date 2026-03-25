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
}

const UserMenu = ({ isClosing }: UserMenuProps) => {
  const { handleLogout, username, lastName } = useLogout();
  const ratingAvg = useSelector(
    (state: RootState) => state.user.user?.ratingAvg,
  );
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
              {username} {lastName}
            </span>

            <span className={styles["rating"]}>
              {ratingAvg ? ratingAvg.toFixed(1) : "—"}
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

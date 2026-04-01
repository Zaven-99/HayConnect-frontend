import styles from "./usrIcon.module.scss";

interface UserIconProps {
  avatar?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const UserIcon = ({ avatar, icon, onClick }: UserIconProps) => {
  return (
    <div onClick={onClick} className={styles["icon-wrapper"]}>
      {avatar ? <img src={avatar} alt="" /> : icon}
    </div>
  );
};

export default UserIcon;

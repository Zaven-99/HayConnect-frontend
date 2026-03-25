import styles from "./header.module.scss";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;

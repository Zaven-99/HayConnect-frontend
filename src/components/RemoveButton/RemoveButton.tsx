import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./removeButton.module.scss";

interface CloseButtonProps {
  array: string[];
  remove: (index: number) => void;
}

const RemoveButton = ({ array, remove }: CloseButtonProps) => {
  return (
    <>
      {Array.isArray(array) &&
        array?.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`preview ${index}`} />
            <div className={styles["icon-wrapper"]}>
              <IoIosCloseCircleOutline
                onClick={() => remove(index)}
                className={styles["icon"]}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default RemoveButton;

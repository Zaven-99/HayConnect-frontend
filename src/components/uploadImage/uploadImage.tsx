import { FiImage } from "react-icons/fi";
import Input from "../input/Input";
import styles from "./uploadImage.module.scss";

interface UploadImageProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({ handleChange }: UploadImageProps) => {
  return (
    <div>
      <div className={styles.uploadBlock}>
        <label className={styles.uploadLabel}>
          <FiImage className={styles.icon} />
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            label=""
          />
        </label>
      </div>
    </div>
  );
};

export default UploadImage;

import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import styles from "./imagePreviewModal.module.scss";
import clsx from "clsx";
import animationStyles from "../../../styles/animation.module.scss";

interface ImagePreviewModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  selectedImage: string;
  isClosing: boolean;
  handleClose: () => void;
}

const ImagePreviewModal = ({
  showModal,
  setShowModal,
  selectedImage,
  isClosing,
  handleClose,
}: ImagePreviewModalProps) => {
  return (
    <div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleClose={handleClose}
          className={clsx(
            styles["image-modal"],
            isClosing ? animationStyles["fadeOut"] : animationStyles["fadeIn"],
          )}
        >
          <img
            src={selectedImage}
            alt="preview"
            className={styles["post-img"]}
          />
          <Button
            onClick={() => {
              setTimeout(() => setShowModal(false), 300);
              handleClose();
            }}
            label={<IoIosCloseCircleOutline />}
            className={styles["close-btn"]}
            type="button"
          />
        </Modal>
      )}
    </div>
  );
};

export default ImagePreviewModal;

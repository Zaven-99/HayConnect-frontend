import clsx from "clsx";
import Modal from "../../modal/Modal";
import UploadImage from "../../uploadImage/uploadImage";
import styles from "./AddImageModal.module.scss";
import { useClosing } from "../../../../utils/useClosing";
import animationStyles from "../../../styles/animation.module.scss";
import RemoveButton from "../../RemoveButton/RemoveButton";
import Button from "../../button/Button";
import Form from "../../auth/form/Form";
interface AddImageModalProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowModal: (value: boolean) => void;
  removePreview: (index: number) => void;
  handleUpdate: () => void;
  preview: string[];
}

const AddImageModal = ({
  handleChange,
  setShowModal,
  preview,
  removePreview,
  handleUpdate,
}: AddImageModalProps) => {
  const { isClosing, handleClose } = useClosing(() => setShowModal(false));

  return (
    <Modal
      setShowModal={setShowModal}
      className={clsx(
        styles["add-image-modal"],
        isClosing ? animationStyles["fadeOut"] : animationStyles["fadeIn"],
      )}
      handleClose={handleClose}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        {preview.length > 0 && (
          <div className={styles["preview-container"]}>
            <RemoveButton array={preview} remove={removePreview} />
          </div>
        )}
        <UploadImage handleChange={handleChange} />
        <Button type="submit" label="Add image" className={styles["add-btn"]} />
      </Form>
    </Modal>
  );
};

export default AddImageModal;

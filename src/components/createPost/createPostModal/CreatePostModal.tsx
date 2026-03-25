import Modal from "../../modal/Modal";
import { useCreatePostModal } from "../hooks/useCreatePostModal";
import styles from "./createPostModal.module.scss";
import { HiUserCircle } from "react-icons/hi";
import Button from "../../button/Button";
import Form from "../../auth/form/Form";
import RemoveButton from "../../RemoveButton/RemoveButton";
import { IoIosCloseCircleOutline } from "react-icons/io";
import animationStyles from "../../../styles/animation.module.scss";
import { useClosing } from "../../../../utils/useClosing";
import clsx from "clsx";
import UploadImage from "../../uploadImage/uploadImage";
import { useUploadImage } from "../../../../utils/useUploadImage";

interface CreatePostModalProps {
  setShowModal: (value: boolean) => void;
}

const CreatePostModal = ({ setShowModal }: CreatePostModalProps) => {
  const {
    handleChange,
    preview,
    removePreview,
    setPreview,
    selectedFiles,
    setSelectedFiles,
  } = useUploadImage();
  const { register, canPost, handlePost, handleSubmit, user } =
    useCreatePostModal({
      setShowModal,
      setPreview,
      setSelectedFiles,
      selectedFiles,
    });

  const { isClosing, handleClose } = useClosing(() => setShowModal(false));

  return (
    <Modal
      setShowModal={setShowModal}
      className={clsx(
        styles["createPostModal"],
        isClosing ? animationStyles["fadeOut"] : animationStyles["fadeIn"],
      )}
      handleClose={handleClose}
    >
      <Button
        onClick={() => {
          setTimeout(() => setShowModal(false), 300);
          handleClose();
        }}
        label={<IoIosCloseCircleOutline />}
        className={styles["close-btn"]}
        type="button"
      />
      <div className={styles["user"]}>
        {user?.avatar ? (
          <img src={user?.avatar} alt="" />
        ) : (
          <div className={styles["icon-wrapper"]}>
            <HiUserCircle className={styles.icon} />
          </div>
        )}
        <div className={styles["user-info"]}>
          <div>{user?.name}</div>
          <div>{user?.lastName}</div>
        </div>
      </div>
      <Form onSubmit={handleSubmit((data) => handlePost(data))}>
        <textarea
          {...register("text")}
          placeholder="Create your post"
          name="text"
          id=""
        ></textarea>

        {preview.length > 0 && (
          <div className={styles["preview-container"]}>
            <RemoveButton array={preview} remove={removePreview} />
          </div>
        )}

        <UploadImage handleChange={handleChange} />
        <Button
          disabled={!canPost}
          type="submit"
          label="Post"
          className={styles["post-btn"]}
        />
      </Form>
    </Modal>
  );
};

export default CreatePostModal;

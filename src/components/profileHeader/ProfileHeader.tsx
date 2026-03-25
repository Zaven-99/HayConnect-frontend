import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { HiUserCircle } from "react-icons/hi";
import styles from "./profileHeader.module.scss";
import { useProfileHeader } from "./hooks/useProfileHeader";
import AddImageModal from "./addImageModal/AddImageModal";
import { useUploadImage } from "../../../utils/useUploadImage";
interface ProfileHeaderProps {
  userId?: number;
}

const ProfileHeader = ({ userId }: ProfileHeaderProps) => {
  const { handleChange, preview, removePreview, selectedFiles } =
    useUploadImage();
  const { setShowModal, showModal, handleUpdate } =
    useProfileHeader(selectedFiles);

  const currentUser = useSelector((state: RootState) => state.user.user);
  const viewedUser = useSelector((state: RootState) => state.user.viewedUser);
  const user = userId ? viewedUser : currentUser;

  return (
    <div className={styles["profile-header"]}>
      <div className={styles["profile-info"]}>
        <div className={styles["wrapper"]}>
          {user?.avatar ? (
            <img
              onClick={() => setShowModal(!showModal)}
              className={styles.avatar}
              src={user.avatar}
              alt="avatar"
            />
          ) : (
            <div className={styles["icon-wrapper"]}>
              <HiUserCircle
                onClick={() => setShowModal(!showModal)}
                className={styles.icon}
              />
            </div>
          )}
          <div className={styles["name"]}>
            {user?.name} {user?.lastName}
          </div>
        </div>

        <div className={styles["rating"]}>
          {user?.ratingAvg
            ? `Rating: ${user.ratingAvg.toFixed(1)}`
            : "No ratings yet"}
        </div>
      </div>
      {showModal && (
        <AddImageModal
          handleChange={handleChange}
          setShowModal={setShowModal}
          preview={preview}
          removePreview={removePreview}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProfileHeader;

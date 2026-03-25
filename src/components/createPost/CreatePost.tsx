import styles from "./createPost.module.scss";
import { HiUserCircle } from "react-icons/hi";
import { useCreatePost } from "./hooks/useCreatePost";
import CreatePostModal from "./createPostModal/CreatePostModal";

const CreatePost = () => {
  const { showModal, setShowModal, userImage } = useCreatePost();
  return (
    <div className={styles.createPostInput}>
      <div className={styles["createPostInput-container"]}>
        <div className={styles["createPostInput-container__inner"]}>
          {userImage ? (
            <img src={userImage} alt="" />
          ) : (
            <div className={styles["icon-wrapper"]}>
              <HiUserCircle className={styles.icon} />
            </div>
          )}

          <p
            onClick={() => setShowModal(!showModal)}
            className={styles["create-post"]}
          >
            Create post
          </p>
        </div>
      </div>
      {showModal && <CreatePostModal setShowModal={setShowModal} />}
    </div>
  );
};

export default CreatePost;

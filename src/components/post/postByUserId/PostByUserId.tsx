import styles from "../post/post.module.scss";

import { usePostByUserId } from "../hooks/usePostByuserId";
import ImagePreviewModal from "../imagePreviewModal/ImagePreviewModal";
import PostByUserIdItem from "./postByUserIdItem/PostByUserIdItem";
import { FaRegSadTear } from "react-icons/fa";

interface PostByUserIdProps {
  userId?: number;
}

const PostByUserId = ({ userId }: PostByUserIdProps) => {
  const {
    showModal,
    setShowModal,
    selectedImage,
    setSelectedImage,
    loading,
    error,
    post,
  } = usePostByUserId(userId);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.post}>
      {post.length === 0 ? (
        <div className={styles.empty}>
          <FaRegSadTear className={styles["empty-icon"]} />
          <p className={styles["empty-title"]}>No posts yet</p>
        </div>
      ) : (
        post.map((item) => (
          <PostByUserIdItem
            item={item}
            key={String(item.id)}
            setShowModal={() => setShowModal(true)}
            onImageClick={setSelectedImage}
          />
        ))
      )}
      <ImagePreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedImage={selectedImage}
        isClosing={false}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default PostByUserId;

import styles from "./post.module.scss";
import { usePost } from "../hooks/usePost";
import { useClosing } from "../../../../utils/useClosing";
import PostItem from "./postItem/PostItem";
import ImagePreviewModal from "../imagePreviewModal/ImagePreviewModal";
import { FaRegSadTear } from "react-icons/fa";

const Post = () => {
  const {
    showModal,
    setShowModal,
    selectedImage,
    post,
    loading,
    error,
    commentsState,
    openCommentPostId,
    setSelectedImage,
    handleComment,
    handleOpenComments,
    register,
    handleSubmit,
    ratings,
    handleLoadMoreComments,
  } = usePost();
  const { isClosing, handleClose } = useClosing(() => setShowModal(false));

  if (loading) return <div className={styles.loader}>Loading posts...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.post}>
      {post.length === 0 ? (
        <div className={styles.empty}>
          <FaRegSadTear className={styles["empty-icon"]} />
          <p className={styles["empty-title"]}>No posts yet</p>
          <p className={styles["empty-subtitle"]}>
            Be the first to share something!
          </p>
        </div>
      ) : (
        post.map((item) => {
          const postIdStr = String(item.id);
          const currentComments = commentsState[postIdStr] || [];

          return (
            <PostItem
              item={item}
              currentComments={currentComments}
              postIdStr={postIdStr}
              setShowModal={setShowModal}
              key={postIdStr}
              openCommentPostId={openCommentPostId}
              setSelectedImage={setSelectedImage}
              handleComment={handleComment}
              handleOpenComments={handleOpenComments}
              register={register}
              handleSubmit={handleSubmit}
              ratings={ratings}
              handleLoadMoreComments={handleLoadMoreComments}
            />
          );
        })
      )}

      <ImagePreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedImage={selectedImage}
        isClosing={isClosing}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Post;

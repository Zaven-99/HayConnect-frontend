import PostMosaic from "../../postMosaic/PostMosaic";
import { Raiting } from "../../../raiting/Raiting";
import styles from "../../post/postItem/postItem.module.scss";
import type { CreatePostForm } from "../../../createPost/types/createPost.types";

interface PostByUserIdItemProps {
  item: CreatePostForm;
  setShowModal: (val: boolean) => void;
  onImageClick: (src: string) => void;
}

const PostByUserIdItem = ({
  item,
  setShowModal,
  onImageClick,
}: PostByUserIdItemProps) => {
  return (
    <div key={item.id} className={styles["post-item"]}>
      <PostMosaic
        setShowModal={() => setShowModal(true)}
        onImageClick={onImageClick}
        images={item.images || []}
      />
      <div className={styles.text}>{item.text}</div>
      <Raiting value={item.rating || 0} disabled={true} />
    </div>
  );
};

export default PostByUserIdItem;

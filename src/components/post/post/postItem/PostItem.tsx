import PostMosaic from "../../postMosaic/PostMosaic";
import { Raiting } from "../../../raiting/Raiting";
import { rateItem } from "../../../store/raitingSlice";
import { FaCommentAlt } from "react-icons/fa";
import Form from "../../../auth/form/Form";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import type { IComment } from "../../types/post.types";
import type { CreatePostForm } from "../../../createPost/types/createPost.types";
import styles from "./postItem.module.scss";
import { useClosing } from "../../../../../utils/useClosing";
import Button from "../../../button/Button";
import animationStyles from "../../../../styles/animation.module.scss";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import Comments from "./comments/Comments";
import UserIcon from "../../../userIcon/UserIcon";
import { usePostItem } from "./hooks/usePostItem";

interface PostItemProps {
  item: CreatePostForm;
  currentComments: IComment[];
  postIdStr: string;
  setShowModal: (value: boolean) => void;
  openCommentPostId: string | null;
  setSelectedImage: (src: string) => void;
  handleComment: (postId: string, text: string) => void;
  handleOpenComments: (postId: string) => void;
  register: UseFormRegister<{ comment: string }>;
  handleSubmit: UseFormHandleSubmit<{ comment: string }>;
  ratings: Record<string, number>;
  handleLoadMoreComments: (postId: string) => void;
}

const PostItem = ({
  item,
  currentComments,
  postIdStr,
  setShowModal,
  openCommentPostId,
  setSelectedImage,
  handleComment,
  handleOpenComments,
  register,
  handleSubmit,
  ratings,
  handleLoadMoreComments,
}: PostItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isClosing, handleClose } = useClosing(() => setShowModal(false));
  const isOpen = openCommentPostId === postIdStr;
  const { handleToggleComments, formattedDate } = usePostItem({
    handleClose,
    handleOpenComments,
    isOpen,
    postIdStr,
    item,
  });

  return (
    <div className={styles["post-item"]}>
      {/* AUTHOR */}
      <div className={styles.author}>
        <div className={styles.left}>
          <div className={styles["icon-wrapper"]}>
            <UserIcon
              icon={<HiUserCircle className={styles.icon} />}
              onClick={() => navigate(`/user/${item.author?.id}`)}
              avatar={item.author?.avatar}
            />
          </div>

          <div className={styles["author-name"]}>
            {item.author
              ? `${item.author.name} ${item.author.lastName}`
              : "Unknown author"}
          </div>
        </div>
      </div>

      {/* IMAGES */}
      <PostMosaic
        onImageClick={setSelectedImage}
        setShowModal={() => setShowModal(true)}
        images={item?.images ?? []}
      />

      {/* TEXT */}
      <div className={styles.text}>{item.text}</div>

      {/* ACTIONS */}
      <div className={styles["post-actions"]}>
        <div className={styles["comment-icon-container"]}>
          <FaCommentAlt
            onClick={handleToggleComments}
            className={styles["comment-btn"]}
          />
          {(item.comments ?? []).length}
        </div>

        <Raiting
          value={ratings[`post_${postIdStr}`] || 0}
          onRate={(value) =>
            dispatch(
              rateItem({
                id: postIdStr,
                type: "post",
                rating: value,
              }),
            )
          }
        />
      </div>

      {/* DATE */}
      <span className={styles.date}>{formattedDate}</span>

      {/* COMMENTS + FORM */}
      {isOpen && (
        <>
          <div
            className={
              isClosing
                ? animationStyles["comments-wrapper-closing"]
                : animationStyles["comments-wrapper-opening"]
            }
          >
            {currentComments.length > 0 && <hr className={styles.divider} />}

            <div className={styles["comment-field"]}>
              <Comments
                handleLoadMoreComments={handleLoadMoreComments}
                currentComments={currentComments}
                postIdStr={postIdStr}
                ratings={ratings}
                dispatch={dispatch}
                navigate={navigate}
              />
            </div>
          </div>

          <Form
            onSubmit={handleSubmit((data) =>
              handleComment(postIdStr, data.comment),
            )}
            className={styles["comment-form"]}
          >
            <textarea
              {...register("comment", { required: true })}
              placeholder="Write your comment..."
              className={styles["comment-textarea"]}
            />

            <Button
              label="Add comment"
              type="submit"
              className={styles["submit-btn"]}
            />
          </Form>
        </>
      )}
    </div>
  );
};

export default PostItem;

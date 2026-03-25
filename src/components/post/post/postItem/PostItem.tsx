import PostMosaic from "../../postMosaic/PostMosaic";
import { Raiting } from "../../../raiting/Raiting";
import { rateItem } from "../../../store/raitingSlice";
import { FaCommentAlt, FaUser } from "react-icons/fa";
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
}: PostItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isClosing, handleClose } = useClosing(() => setShowModal(false));

  const isOpen = openCommentPostId === postIdStr;

  const navigate = useNavigate();

  return (
    <div className={styles["post-item"]}>
      <div className={styles.author}>
        <div>
          {item.author?.avatar ? (
            <img
              onClick={() => navigate(`/user/${item.author?.id}`)}
              className={styles.avatar}
              src={item.author.avatar}
              alt="avatar"
            />
          ) : (
            <div className={styles["icon-wrapper"]}>
              <HiUserCircle
                onClick={() => navigate(`/user/${item.author?.id}`)}
                className={styles.icon}
              />
            </div>
          )}
        </div>
        <div className={styles["author-name"]}>
          {item.author
            ? `${item.author.name} ${item.author.lastName}`
            : "Unknown author"}
        </div>
      </div>
      <PostMosaic
        onImageClick={setSelectedImage}
        setShowModal={() => setShowModal(true)}
        images={item?.images ?? []}
      />

      <div className={styles.text}>{item.text}</div>

      <div className={styles["post-actions"]}>
        <div className={styles["comment-icon-container"]}>
          <FaCommentAlt
            onClick={() => {
              if (isOpen) {
                handleClose();
                setTimeout(() => handleOpenComments(postIdStr), 300);
              } else {
                handleOpenComments(postIdStr);
              }
            }}
            className={styles["comment-btn"]}
          />
          {(item.comments ?? []).length}
        </div>

        <Raiting
          value={ratings[`post_${postIdStr}`] || 0}
          onRate={(value) =>
            dispatch(rateItem({ id: postIdStr, type: "post", rating: value }))
          }
        />
      </div>

      <span className={styles.date}>
        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
      </span>

      {isOpen && (
        <div
          className={
            isClosing
              ? animationStyles["comments-wrapper-closing"]
              : animationStyles["comments-wrapper-opening"]
          }
        >
          {currentComments.length > 0 && <hr className={styles.divider} />}

          <div className={styles["comment-field"]}>
            {currentComments.map((comment) => {
              const commentIdStr = String(comment.id);
              const goToUser = () => navigate(`/user/${comment.authorId}`);
              return (
                <div key={commentIdStr} className={styles.comment}>
                  <div className={styles["user-info"]}>
                    {comment.authorAvatar ? (
                      <img
                        className={styles.avatar}
                        src={comment.authorAvatar}
                        onClick={goToUser}
                        alt="avatar"
                      />
                    ) : (
                      <div className={styles["icon-wrapper"]}>
                        <FaUser onClick={goToUser} className={styles.icon} />
                      </div>
                    )}
                    <strong>{comment.authorName}</strong>
                  </div>

                  <p className={styles["comment-text"]}>{comment.text}</p>

                  <Raiting
                    value={ratings[`comment_${commentIdStr}`] || 0}
                    onRate={(value) =>
                      dispatch(
                        rateItem({
                          id: commentIdStr,
                          type: "comment",
                          rating: value,
                        }),
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isOpen && (
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
      )}
    </div>
  );
};

export default PostItem;

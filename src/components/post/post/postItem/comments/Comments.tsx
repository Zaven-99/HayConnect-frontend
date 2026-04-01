import { FaUser } from "react-icons/fa";
import { Raiting } from "../../../../raiting/Raiting";
import Button from "../../../../button/Button";
import styles from "./comments.module.scss";
import type { IComment } from "../../../types/post.types";
import { rateItem } from "../../../../store/raitingSlice";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../../../../store/store";
import UserIcon from "../../../../userIcon/UserIcon";

interface CommentsProps {
  currentComments: IComment[];
  postIdStr: string;
  ratings: Record<string, number>;
  handleLoadMoreComments: (postId: string) => void;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

const Comments = ({
  currentComments,
  postIdStr,
  ratings,
  handleLoadMoreComments,
  dispatch,
  navigate,
}: CommentsProps) => {
  return (
    <div>
      {currentComments.map((comment) => {
        const commentKey = `${postIdStr}_${comment.id}`;
        const goToUser = () => navigate(`/user/${comment.authorId}`);
        return (
          <div key={commentKey} className={styles.comment}>
            <div className={styles["user-info"]}>
              <div className={styles["icon-wrapper"]}>
                <UserIcon
                  avatar={comment.authorAvatar}
                  onClick={goToUser}
                  icon={<FaUser className={styles.icon} />}
                />
              </div>
              <strong>{comment.authorName}</strong>
            </div>

            <p className={styles["comment-text"]}>{comment.text}</p>

            <Raiting
              value={ratings[`comment_${commentKey}`] || 0}
              onRate={(value) =>
                dispatch(
                  rateItem({
                    id: commentKey,
                    type: "comment",
                    rating: value,
                  }),
                )
              }
            />
          </div>
        );
      })}
      {currentComments.length > 0 && currentComments.length % 15 === 0 && (
        <Button
          label="Показать ещё"
          type="button"
          onClick={() => handleLoadMoreComments(postIdStr)}
          className={styles["load-more-btn"]}
        />
      )}
    </div>
  );
};

export default Comments;

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../store/store";
import { getPost } from "../../store/postSlice";
import { setRaiting } from "../../store/raitingSlice";
import { addComment, getComments } from "../../store/commentSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const usePost = () => {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>({
    defaultValues: { comment: "" },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null,
  );
  const [pageByPost, setPageByPost] = useState<Record<string, number>>({});

  const ratings = useSelector((state: RootState) => state.raiting.ratings);
  const { post, loading, error } = useSelector(
    (state: RootState) => state.post,
  );
  const commentsState = useSelector(
    (state: RootState) => state.comment.comments,
  );

  useEffect(() => {
    dispatch(getPost()).then((result) => {
      if (getPost.rejected.match(result)) {
        navigate("/");
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    post.forEach((p) => {
      dispatch(setRaiting({ id: `post_${p.id}`, rating: p.rating ?? 0 }));
      p.comments?.forEach((c) => {
        dispatch(setRaiting({ id: `comment_${c.id}`, rating: c.rating ?? 0 }));
      });
    });
  }, [post, dispatch]);

  const handleComment = async (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    try {
      await dispatch(addComment({ postId, text: commentText })).unwrap();
      reset();
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleLoadMoreComments = (postId: string) => {
    const currentPage = pageByPost[postId] || 0;
    const nextPage = currentPage + 1;

    setPageByPost((prev) => ({
      ...prev,
      [postId]: nextPage,
    }));

    dispatch(getComments({ postId, page: nextPage }));
  };

  const handleOpenComments = useCallback(
    (postId: string) => {
      const idStr = postId.toString();
      if (openCommentPostId === idStr) {
        setOpenCommentPostId(null);
      } else {
        setOpenCommentPostId(idStr);
        dispatch(getComments({ postId: idStr, page: 0 }));
        setPageByPost((prev) => ({
          ...prev,
          [idStr]: 0,
        }));
      }
    },

    [openCommentPostId, dispatch],
  );

  return {
    showModal,
    setShowModal,
    selectedImage,
    setSelectedImage,
    post,
    loading,
    error,
    openCommentPostId,
    handleComment,
    commentsState,
    handleOpenComments,
    register,
    handleSubmit,
    ratings,
    handleLoadMoreComments,
  };
};

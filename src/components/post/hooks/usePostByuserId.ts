import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getPostByUserId } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

export const usePostByUserId = (userId?: number) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  const targetId = userId ?? user?.id;

  useEffect(() => {
    if (targetId) {
      dispatch(getPostByUserId(targetId)).then((result) => {
        if (getPostByUserId.rejected.match(result)) {
          navigate("/");
        }
      });
    }
  }, [dispatch, targetId, navigate]);

  const { post, loading, error } = useSelector(
    (state: RootState) => state.post,
  );

  return {
    showModal,
    setShowModal,
    selectedImage,
    setSelectedImage,
    loading,
    error,
    post,
  };
};

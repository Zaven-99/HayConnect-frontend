import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
export const useCreatePost = () => {
  const [showModal, setShowModal] = useState(false);

  const userImage = useSelector((state: RootState) => state.user.user?.avatar);

  return {
    setShowModal,
    showModal,
    userImage,
  };
};

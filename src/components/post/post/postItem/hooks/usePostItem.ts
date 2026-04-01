import { useMemo } from "react";
import type { CreatePostForm } from "../../../../createPost/types/createPost.types";

interface UsePostItemProps {
  handleClose: () => void;
  handleOpenComments: (postId: string) => void;
  isOpen: boolean;
  postIdStr: string;
  item: CreatePostForm;
}

export const usePostItem = ({
  handleClose,
  handleOpenComments,
  isOpen,
  postIdStr,
  item,
}: UsePostItemProps) => {
  const formattedDate = useMemo(() => {
    return item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "";
  }, [item.createdAt]);

  const handleToggleComments = () => {
    if (isOpen) {
      handleClose();
      setTimeout(() => handleOpenComments(postIdStr), 300);
    } else {
      handleOpenComments(postIdStr);
    }
  };

  return {
    formattedDate,
    handleToggleComments,
  };
};

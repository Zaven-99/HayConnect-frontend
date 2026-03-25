import { useForm } from "react-hook-form";
import type { CreatePostForm } from "../types/createPost.types";
import { addPost } from "../../store/postSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface UseCreatePostModalProps {
  setShowModal: (val: boolean) => void;
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  selectedFiles: File[];
}

export const useCreatePostModal = ({
  setShowModal,
  setPreview,
  setSelectedFiles,
  selectedFiles,
}: UseCreatePostModalProps) => {
  const { register, handleSubmit, watch, reset } = useForm<CreatePostForm>({
    defaultValues: { text: "" },
  });

  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line react-hooks/incompatible-library
  const textValue = watch("text") || "";

  const canPost = textValue.trim() !== "";

  const handlePost = async (data: CreatePostForm) => {
    try {
      await dispatch(addPost({ data, files: selectedFiles })).unwrap();
      setPreview([]);
      setSelectedFiles([]);
      setShowModal(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const user = useSelector((state: RootState) => state.user.user);

  return {
    register,
    handleSubmit,
    canPost,
    handlePost,
    user,
  };
};

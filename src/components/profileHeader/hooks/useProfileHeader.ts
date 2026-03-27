import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { updateUser } from "../../store/userSlice";
import { useForm } from "react-hook-form";
import type { UpdateUserForm } from "../types/profileHeader.types";

export const useProfileHeader = (selectedFiles: File[]) => {
  const { handleSubmit, reset } = useForm<UpdateUserForm>({
    defaultValues: { avatar: undefined },
  });
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("avatar", file);
    });

    dispatch(updateUser(formData))
      .unwrap()
      .then((user) => {
        reset();
        console.log("Updated user:", user);
      })
      .catch((err) => console.error(err));
  };

  return {
    setShowModal,
    showModal,
    handleUpdate,
    handleSubmit,
  };
};

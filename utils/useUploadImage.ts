import { useState } from "react";

export const useUploadImage = () => {
  const [, setFiles] = useState<File[]>([]);

  const [preview, setPreview] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setFiles(filesArray);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreview((prev) => [...prev, ...newPreviews]);

      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
    e.target.value = "";
  };

  const removePreview = (index: number) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    handleChange,
    preview,
    selectedFiles,
    removePreview,
    setPreview,
    setSelectedFiles,
  };
};

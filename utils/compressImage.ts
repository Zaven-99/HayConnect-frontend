// utils/compressImage.ts
export const compressImage = (
  file: File,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.7,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      if (!event.target) return reject("Failed to read file");
      image.src = event.target.result as string;
    };

    image.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = image;

      // Поддерживаем пропорции
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Failed to get canvas context");
      ctx.drawImage(image, 0, 0, width, height);

      // Получаем blob сжатого изображения
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Canvas toBlob failed");
          const compressedFile = new File([blob], file.name, {
            type: file.type,
          });
          resolve(compressedFile);
        },
        file.type,
        quality,
      );
    };

    image.onerror = (err) => reject(err);
  });
};

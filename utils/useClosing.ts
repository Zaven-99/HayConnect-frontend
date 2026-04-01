import { useCallback, useEffect, useRef, useState } from "react";

export const useClosing = (onClose: () => void) => {
  const [isClosing, setIsClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  const isClosingRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;

    setIsClosing(true);
    isClosingRef.current = true;

    setTimeout(() => {
      onCloseRef.current();
      setIsClosing(false);
      isClosingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  return { isClosing, handleClose };
};

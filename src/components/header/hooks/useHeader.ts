import { useState } from "react";

export const useHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  return {
    setShowMenu,
    showMenu,
  };
};

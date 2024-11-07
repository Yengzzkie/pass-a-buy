// useDialog.js
import { useState } from "react";

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleDialog };
};

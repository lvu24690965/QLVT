import React from "react";
import { useAppStore } from "~/store/useAppStore";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div
      onClick={() => setModal(false, null)}
      className="fixed z-[999] flex items-center justify-center top-0 h-full w-full bg-overlay-60">
      {contentModal}
    </div>
  );
};

export default Modal;

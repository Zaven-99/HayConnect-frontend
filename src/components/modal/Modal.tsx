import { type ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
  children: ReactNode;
  className: string;
  setShowModal: (value: boolean) => void;
  handleClose?: () => void;
}

const Modal = ({
  children,
  setShowModal,
  handleClose,
  className,
  ...props
}: ModalProps) => {
  return (
    <div
      onClick={() => {
        setTimeout(() => setShowModal(false), 300);
        handleClose?.();
      }}
      className={styles.overlay}
    >
      <div
        {...props}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

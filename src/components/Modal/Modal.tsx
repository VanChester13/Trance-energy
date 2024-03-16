import { useEffect, useRef, useCallback, ReactNode } from "react";
import { bodyFixPosition, bodyUnfixPosition } from "../../libs/scroll";

import styles from "./Modal.module.scss";

interface IProps {
  children: ReactNode;
  open: () => void;
  close: () => void;
}

const Modal = ({ children, open, close }: IProps): React.ReactElement => {
  const modalRef = useRef(null);

  const onEscapeKeyDownHandler = useCallback(
    (e: KeyboardEvent) => e.key === "Escape" && close(),
    [close]
  );

  const handleOutsideClick = useCallback(
    (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(modalRef.current)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    document.body.addEventListener("keydown", onEscapeKeyDownHandler);
    return () => {
      document.body.removeEventListener("keydown", onEscapeKeyDownHandler);
    };
  }, [onEscapeKeyDownHandler]);

  useEffect(() => {
    setTimeout(() => {
      bodyFixPosition();
      open();
    }, 0);
    return () => {
      bodyUnfixPosition();
    };
  }, [open]);

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div onClick={close} className={styles.btnCansel} />
        {children}
      </div>
    </div>
  );
};

export default Modal;

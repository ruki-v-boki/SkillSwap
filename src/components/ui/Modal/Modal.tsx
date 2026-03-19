import { useClickOutside } from '@/hooks/useClickOutside';
import type { ModalUIProps } from './type';
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';


export function ModalUI({
  onClose,
  children
}:ModalUIProps) {
  const modalRoot = document.getElementById('modals');
  const modalRef = useRef<HTMLDivElement>(null);

// ---------------------------------------------------------------

  useClickOutside(modalRef, onClose);

// ---------------------------------------------------------------

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

// ---------------------------------------------------------------

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div
        ref={modalRef}
        className={styles.modal}
      >
        {children}
      </div>
    </div>,
    modalRoot as HTMLElement
  );
}
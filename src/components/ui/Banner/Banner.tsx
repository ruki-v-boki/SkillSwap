import { useClickOutside } from '@/hooks/useClickOutside';
import type { BannerUIProps } from './type';
import styles from './Banner.module.css';
import { useRef } from 'react';

// ---------------------------------------------------------------

export function BannerUI({
  isOpen,
  onClose,
  children,
  className = '',
  triggerRef,
}: BannerUIProps) {

  const bannerRef = useRef<HTMLDivElement>(null);

// ---------------------------------------------------------------

  useClickOutside(
    bannerRef,
    onClose,
    triggerRef
  );

// ---------------------------------------------------------------

  if (!isOpen) return null;

// ---------------------------------------------------------------

  return (
    <div
      ref={bannerRef}
      className={`${styles.banner} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
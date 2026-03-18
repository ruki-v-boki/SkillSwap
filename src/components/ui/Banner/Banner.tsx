import styles from './Banner.module.css';
import { useRef } from 'react';
import type { BannerUIProps } from './type';
import { useClickOutside } from '@/hooks/useClickOutside';


export function BannerUI({
  isOpen,
  onClose,
  children,
  className = '',
  triggerRef,
  'data-testid': dataTestId
}: BannerUIProps) {

  const bannerRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    bannerRef,
    onClose,
    triggerRef
  );

  if (!isOpen) return null;

  return (
    <div
      ref={bannerRef}
      className={`${styles.banner} ${className}`.trim()}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
}
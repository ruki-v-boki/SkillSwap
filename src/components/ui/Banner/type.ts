import type { ReactNode, RefObject } from "react";

export type BannerUIProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  triggerRef?: RefObject<HTMLElement | null>;
  'data-testid'?: string;
}
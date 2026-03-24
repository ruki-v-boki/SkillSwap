import type { RegisterData } from "@/types/auth";

export type UserOfferModalProps = {
  userRegisterData?: RegisterData;
  onEditClick?: () => void;
  onReadyClick?: () => void;
}
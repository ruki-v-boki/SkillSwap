import type { RegisterData } from "@/types/auth";

export type UserOfferModalProps = {
  previewData: RegisterData;
  onConfirm: () => void;
  onEdit: () => void;
}
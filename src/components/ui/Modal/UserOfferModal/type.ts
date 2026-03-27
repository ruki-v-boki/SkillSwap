import type { RegistrationPreview } from "@/types/auth";

// ---------------------------------------------------------------

export type UserOfferModalProps = {
  previewData: RegistrationPreview;
  onConfirm: () => void;
  onEdit: () => void;
}
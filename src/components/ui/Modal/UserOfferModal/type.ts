import type { RegistrationPreview } from "@/types/register";

// ---------------------------------------------------------------

export type UserOfferModalProps = {
  previewData: RegistrationPreview;
  onConfirm: () => void;
  onEdit: () => void;
}
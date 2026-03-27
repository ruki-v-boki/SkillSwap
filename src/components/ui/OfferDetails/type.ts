import type { RegistrationPreview } from "@/types/auth";
import type { IUser } from "@/types/types";

// ---------------------------------------------------------------

export type OfferDetailsUIProps = {
  previewData?: RegistrationPreview;
  user?: IUser;
  variant: 'offerPage' | 'modal';
  onEdit?: () => void;
  onConfirm?: () => void;
}
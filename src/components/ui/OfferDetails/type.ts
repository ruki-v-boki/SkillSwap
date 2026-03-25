import type { RegisterData } from "@/types/auth";
import type { IUser } from "@/types/types";

export type OfferDetailsUIProps = {
  previewData?: RegisterData;
  user?: IUser;
  variant: 'offerPage' | 'modal';
  onEdit?: () => void;
  onConfirm?: () => void;
}
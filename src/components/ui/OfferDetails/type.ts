import type { IUser } from "@/types/types"

export type OfferDetailsUIProps = {
  user: IUser;
  variant: 'offerPage' | 'modal';
}
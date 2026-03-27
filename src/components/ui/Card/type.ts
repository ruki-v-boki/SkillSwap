import type { IUser } from "@/types/types";

// ---------------------------------------------------------------

export type CardUIProps = {
  user: IUser;
  styleType: TCardStyle;
  onCardClick?: () => void;
}

// ---------------------------------------------------------------

export type TCardStyle = 'catalog' | 'profile' | 'modal';
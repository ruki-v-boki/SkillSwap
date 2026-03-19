import type { IUser } from "@/types/types";

export type CardUIProps = {
  user: IUser;
  styleType: TCardStyle;
}

export type TCardStyle = 'catalog' | 'profile' | 'modal';
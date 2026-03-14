import type { IUser } from "@/types/types"


export type CardUIProps = {
  user: IUser;
  type: 'catalog' | 'profile';
}
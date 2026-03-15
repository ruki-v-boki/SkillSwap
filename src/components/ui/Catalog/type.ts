import type { IUser } from "@/types/types";

export type CatalogUIProps = {
  users: IUser[];
  hasFilters: boolean;
  onResetFilters?: () => void;
  allUsers: IUser[];
}
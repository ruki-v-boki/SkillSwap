import type { IUser } from "@/types/types"

export type CatalogSectionUIProps = {
  users: IUser[];
  title?: string;
  visibleCardsValue?: number,
}
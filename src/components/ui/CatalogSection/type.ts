import type { IUser } from "@/types/types"
import type { Variants } from "framer-motion";

export type CatalogSectionUIProps = {
  users: IUser[];
  title?: string;
  visibleCardsValue?: number,
  containerVariants?: Variants;
}
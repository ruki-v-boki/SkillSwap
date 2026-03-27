import type { Variants } from "framer-motion";
import type { IUser } from "@/types/types";

// ---------------------------------------------------------------

export type CatalogSectionUIProps = {
  users: IUser[];
  title?: string;
  visibleCardsValue?: number,
  containerVariants?: Variants;
}
import type { Category } from "@/types/types";
import type { TCardStyle } from "../type";

// ---------------------------------------------------------------

export type TSkillsListUIProps = {
  tags: {
    id: string;
    name: string;
    category: Category;
  }[];
  variant: 'teach' | 'learn';
  maxVisible?: number;
  styleType: TCardStyle;
};
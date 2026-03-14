import type { Category } from "@/types/types";


export type TSkillsListUIProps = {
  tags: {
    id: string;
    name: string;
    category: Category;
  }[];
  variant: 'teach' | 'learn';
  maxVisible?: number;
};
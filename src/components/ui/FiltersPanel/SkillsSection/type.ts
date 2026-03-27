import type { Category, Subcategory } from "@/types/types";

// ---------------------------------------------------------------

export type SkillsSectionUIProps = {
  categories: Category[];
  subcategories: Subcategory[];
  onChange?: (selectedCategories: string[], selectedSkills: string[]) => void;
  dataTestId?: string;
  selectedCategories?: string[];
  selectedSkills?: string[];
}
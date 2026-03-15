import type { FiltersPanelUIProps } from "@/components/ui/FiltersPanel/type";

export type FilterProps = {
  categories: FiltersPanelUIProps['categories'];
  subcategories: FiltersPanelUIProps['subcategories'];
  cities: string[];
  className?: string;
  'data-testid'?: string;
}
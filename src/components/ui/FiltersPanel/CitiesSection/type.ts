import type { FiltersPanelUIState } from "../type";

// ---------------------------------------------------------------

export type CitiesSectionProps = {
  cities: string[];
  value: FiltersPanelUIState;
  onChange: (selectedCities: string[]) => void;
}
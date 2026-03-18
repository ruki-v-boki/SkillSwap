import type { IUser } from "@/types/types";
import type { FiltersState } from "../type";


export const citiesFilter = (user: IUser, filters: FiltersState): boolean => {
  if (filters.selectedCities.length === 0) {
    return true;
  }

  return filters.selectedCities.includes(user.location);
};
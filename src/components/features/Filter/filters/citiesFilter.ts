import type { FiltersState, IUser } from "@/types/types";


export const citiesFilter = (user: IUser, filters: FiltersState): boolean => {
  if (filters.selectedCities.length === 0) {
    return true;
  }

  return filters.selectedCities.includes(user.location);
};
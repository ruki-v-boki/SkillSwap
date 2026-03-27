import { categoryFilter } from "./categoryFilter";
import { skillsFilter } from "./skillsFilter";
import { citiesFilter } from "./citiesFilter";
import { genderFilter } from "./genderFilter";
import type { FiltersState } from "./type";
import type { IUser } from "@/types/types";

// ---------------------------------------------------------------

export const usersFilter = (users: IUser[], filters: FiltersState): IUser[] => {
  return users.filter(user => {
    if (!categoryFilter(user, filters)) return false;
    if (!skillsFilter(user, filters)) return false;
    if (!citiesFilter(user, filters)) return false;
    if (!genderFilter(user, filters)) return false;

    return true;
  });
};
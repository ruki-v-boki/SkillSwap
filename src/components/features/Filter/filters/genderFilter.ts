import type { IUser } from "@/types/types";
import type { FiltersState } from "../type";


export const genderFilter = (user: IUser, filters: FiltersState): boolean => {
  if (filters.authorGender === 'any') {
    return true;
  }

  return user.gender === filters.authorGender;
};
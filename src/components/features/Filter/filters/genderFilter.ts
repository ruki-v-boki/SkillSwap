import type { FiltersState, IUser } from "@/types/types";


export const genderFilter = (user: IUser, filters: FiltersState): boolean => {
  if (filters.authorGender === 'any') {
    return true;
  }

  return user.gender === filters.authorGender;
};
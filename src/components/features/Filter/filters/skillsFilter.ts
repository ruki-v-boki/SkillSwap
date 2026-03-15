import type { FiltersState, IUser } from "@/types/types";


export const skillsFilter = (user: IUser, filters: FiltersState): boolean => {
  const userSkills = [
    user.canTeach?.subcategoryId,
    ...user.wantToLearn.map(skill => skill.subcategoryId)
  ].filter((id): id is string => id !== undefined);

  if (filters.selectedSkills.length === 0) {
    return true;
  }

  if (userSkills.length === 0) {
    return false;
  }

  return userSkills.some(skillId => 
    filters.selectedSkills.includes(skillId)
  );
};
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearSearch, setIsOpen } from './searchSlice';
import { APP_SUBCATEGORIES } from '@/constants/skills';
import { addSkillWithCategory } from '../filter/filterSlice';


export const selectSkillFromSearch = createAsyncThunk(
  'search/selectSkill',
  async (skillId: string, { dispatch }) => {

    const skill = APP_SUBCATEGORIES.find(s => s.id === skillId);

    if (skill) {
      dispatch(addSkillWithCategory({
        skillId,
        categoryId: skill.categoryId
      }));
    } else {
      dispatch(addSkillWithCategory({ skillId, categoryId: '' }));
    }

    dispatch(clearSearch());
    dispatch(setIsOpen(false));
    
    return skillId;
  }
);
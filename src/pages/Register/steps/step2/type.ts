import type { TCity, TGender, WantToLearnSkill } from "@/types/types";

// ---------------------------------------------------------------

export type Step2FormProps = {
  initialData?: {
      avatar?: { file: File; preview: string } | null;
      name?: string;
      age?: number;
      birthDate?: string | null;
      gender?: TGender;
      location?: TCity;
      selectedCategories?: string[];
      wantToLearn?: Omit<WantToLearnSkill, 'id'>[];
    };
  onSubmit: (data: {
      avatar?: { file: File; preview: string } | null;
      name: string;
      age: number;
      birthDate: string | null;
      gender: TGender;
      location: TCity;
      selectedCategories: string[];
      wantToLearn: Omit<WantToLearnSkill, 'id'>[];
    }) => void;
  onBack: () => void;
}
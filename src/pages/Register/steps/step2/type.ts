import type { TGender, WantToLearnSkill } from "@/types/types";
import type { TCity } from "@/constants/cities";


export type Step2FormProps = {
  initialData?: {
      name?: string;
      age?: number;
      gender?: TGender;
      location?: TCity;
      about?: string;
      wantToLearn?: Omit<WantToLearnSkill, 'id'>[];
    };
  onSubmit: (data: {
      name: string;
      age: number;
      gender: TGender;
      location: TCity;
      about: string;
      wantToLearn: Omit<WantToLearnSkill, 'id'>[];
    }) => void;
  onBack: () => void;
}
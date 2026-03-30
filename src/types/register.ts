import type {
  AvatarInput,
  CanTeachSkillInput,
  TCity,
  TGender,
  WantToLearnSkill
} from "./types";

// ---------------------------------------------------------------

export type RegisterData = {
  // step 1
  email: string;
  password: string;

  // step 2
  avatar?: AvatarInput | null; // ← File для загрузки
  name: string;
  age: number;
  birthDate: string | null;
  gender: TGender;
  location: TCity;
  wantToLearn: Omit<WantToLearnSkill, 'id'>[];

  // step 3
  canTeach: CanTeachSkillInput; // ← File[] для загрузки
}

// ---------------------------------------------------------------

export type RegistrationPreview = {
  canTeach: CanTeachSkillInput;
}
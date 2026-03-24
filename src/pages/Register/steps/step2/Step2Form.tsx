import { AvatarLoader } from '@/components/features/AvatarLoader/AvatarLoader';
import { APP_CATEGORIES, APP_SUBCATEGORIES } from '@/constants/skills';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Select } from '@/components/ui/Select';
import type { TCity } from '@/constants/cities';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { TGender } from '@/types/types';
import type { Step2FormProps } from './type';
import styles from './Step2Form.module.css';
import { CITIES } from '@/constants/cities';


export function Step2Form({
  initialData,
  onSubmit,
  onBack
}: Step2FormProps) {

  const [formData, setFormData] = useState({
    avatar: null as { file: File; preview: string } | null,
    name: initialData?.name || '',
    age: initialData?.age || 0,
    gender: initialData?.gender || 'any',
    location: initialData?.location || '' as TCity,
    about: initialData?.about || '',
    wantToLearn: initialData?.wantToLearn || [],
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    formData.wantToLearn.map(s => s.subcategoryId)
  );

  const [errors, setErrors] = useState<{
    avatar?: string;
    name?: string;
    age?: string;
    location?: string;
    categories?: string;
    wantToLearn?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name: boolean;
    age: boolean;
    location: boolean;
    categories: boolean;
    wantToLearn: boolean;
  }>({
    name: false,
    age: false,
    location: false,
    categories: false,
    wantToLearn: false,
  });

// ---------------------------------------------------------------

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const ageValue = formData.age === 0 ? '' : String(formData.age);

// ---------------------------------------------------------------

  const validateName = (value: string): string | undefined => {
    if (value.trim() === '') return 'Имя обязательно';
    if (value.length < 2) return 'Имя должно быть не менее 2 символов';
    return undefined;
  };

  const validateAge = (value: number): string | undefined => {
    if (value === 0) return 'Возраст обязателен';
    if (value < 18) return 'Вам должно быть больше 17 лет';
    if (value > 120) return 'Введите корректный возраст';
    return undefined;
  };

  const validateLocation = (value: string): string | undefined => {
    if (value === '') return 'Выберите город';
    return undefined;
  };

  const validateCategories = (categories: string[]): string | undefined => {
    if (categories.length === 0) return 'Выберите хотя бы одну категорию';
    return undefined;
  };

  const validateSubcategories = (skills: string[]): string | undefined => {
    if (skills.length === 0) return 'Выберите хотя бы один навык';
    return undefined;
  };

// ---------------------------------------------------------------

  const isFormValid = useMemo(() => {
    const nameValid = formData.name.trim() !== '' && !validateName(formData.name);
    const ageValid = formData.age !== 0 && !validateAge(formData.age);
    const locationValid = Boolean(formData.location) && !validateLocation(formData.location);
    const categoriesValid = selectedCategories.length > 0;
    const subcategoriesValid = selectedSkills.length > 0;

    return nameValid && ageValid && locationValid && categoriesValid && subcategoriesValid;
  }, [formData.name, formData.age, formData.location, selectedCategories, selectedSkills]);

  const isNameValid = formData.name.trim() !== '' && !validateName(formData.name);
  const isAgeValid = formData.age !== 0 && !validateAge(formData.age);
  const isLocationValid = Boolean(formData.location) && !validateLocation(formData.location);
  const isCategoriesValid = selectedCategories.length > 0;
  const isSubcategoriesValid = selectedSkills.length > 0;

  const showNameError = errors.name && (touched.name || attemptedSubmit);
  const showAgeError = errors.age && (touched.age || attemptedSubmit);
  const showLocationError = errors.location && (touched.location || attemptedSubmit);
  const showCategoriesError = errors.categories && (touched.categories || attemptedSubmit);
  const showSubcategoriesError = errors.wantToLearn && (touched.wantToLearn || attemptedSubmit);

// ---------------------------------------------------------------

  const genderOptions = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'any', label: 'Не указан' },
  ];

  const cityOptions = CITIES.map(city => ({ value: city, label: city }));
  const categoryOptions = APP_CATEGORIES.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const availableSubcategories = APP_SUBCATEGORIES.filter(
    sub => selectedCategories.includes(sub.categoryId)
  );
  const skillOptions = availableSubcategories.map(subcategory => ({
    value: subcategory.id,
    label: subcategory.name,
  }));

// ---------------------------------------------------------------

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    setErrors(prev => ({ ...prev, name: undefined }));
  };

  const handleAgeChange = (value: number) => {
    setFormData({ ...formData, age: value });
    setErrors(prev => ({ ...prev, age: undefined }));
  };

  const handleLocationChange = (value: string | string[]) => {
    setFormData({ ...formData, location: value as TCity });
    setTouched(prev => ({ ...prev, location: true }));
    setErrors(prev => ({ ...prev, location: undefined }));
  };

  const handleGenderChange = (value: string | string[]) => {
    setFormData({ ...formData, gender: value as TGender });
  };

  const handleCategoriesChange = (value: string | string[]) => {
    const categoryIds = value as string[];
    setSelectedCategories(categoryIds);
    setSelectedSkills([]);
    setFormData(prev => ({ ...prev, wantToLearn: [] }));
    setTouched(prev => ({ ...prev, categories: true, wantToLearn: true }));
    setErrors(prev => ({ ...prev, categories: undefined, wantToLearn: undefined }));
  };

  const handleSkillsChange = (value: string | string[]) => {
    const skillIds = value as string[];
    setSelectedSkills(skillIds);

    const wantToLearn = skillIds.map(skillId => ({
      categoryId: APP_SUBCATEGORIES.find(s => s.id === skillId)?.categoryId || '',
      subcategoryId: skillId,
    }));

    setFormData(prev => ({ ...prev, wantToLearn }));
    setTouched(prev => ({ ...prev, wantToLearn: true }));
    setErrors(prev => ({ ...prev, wantToLearn: undefined }));
  };

// ---------------------------------------------------------------

  const validateAll = (): boolean => {
    const nameError = validateName(formData.name);
    const ageError = validateAge(formData.age);
    const locationError = validateLocation(formData.location);
    const categoriesError = validateCategories(selectedCategories);
    const subcategoriesError = validateSubcategories(selectedSkills);

    setErrors({
      name: nameError,
      age: ageError,
      location: locationError,
      categories: categoriesError,
      wantToLearn: subcategoriesError,
    });

    return !nameError && !ageError && !locationError && !categoriesError && !subcategoriesError;
  };

// ---------------------------------------------------------------

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    setTouched({
      name: true,
      age: true,
      location: true,
      categories: true,
      wantToLearn: true,
    });

    if (validateAll()) {
      onSubmit({
        avatar: formData.avatar,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        about: formData.about,
        wantToLearn: formData.wantToLearn,
      });
    }
  };

// ---------------------------------------------------------------
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatar?.preview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setFormData(prev => ({
        ...prev,
        avatar: { file, preview }
      }));
    }
  };


  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

// ---------------------------------------------------------------

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
      {/* -------------------- Фото --------------------*/}
        <AvatarLoader
          ref={fileInputRef}
          variant="registerForm"
          onChange={handleAvatarChange}
          previewUrl={avatarPreview}
        />
      {/* -------------------- Имя --------------------*/}
      <Input
        label="Имя"
        placeholder="Введите ваше имя"
        value={formData.name}
        onChange={(e) => handleNameChange(e.target.value)}
        onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
        error={showNameError ? errors.name : undefined}
        isValid={isNameValid}
      />
      {/* -------------------- Возраст + Пол --------------------*/}
      <div className={styles.rowContainer}>
        <Input
          type="number"
          label="Возраст"
          placeholder="Ваш возраст"
          value={ageValue}
          onChange={(e) => {
            const value = e.target.value;
            handleAgeChange(value ? Number(value) : 0);
          }}
          onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
          error={showAgeError ? errors.age : undefined}
          isValid={isAgeValid}
        />
        <Select
          type="single"
          label="Пол"
          placeholder="Не указан"
          value={formData.gender}
          onChange={handleGenderChange}
          options={genderOptions}
        />
      </div>
      {/* -------------------- Город --------------------*/}
      <Select
        type="single"
        label="Город"
        placeholder="Не указан"
        value={formData.location}
        onChange={handleLocationChange}
        options={cityOptions}
        error={showLocationError ? errors.location : undefined}
        required
        attemptedSubmit={attemptedSubmit}
        isValid={isLocationValid}
      />
      {/* -------------------- Категория --------------------*/}
      <Select
        type="multiple"
        label="Категория навыка, которому хотите научиться"
        placeholder="Выберите категории"
        value={selectedCategories}
        onChange={handleCategoriesChange}
        options={categoryOptions}
        error={showCategoriesError ? errors.categories : undefined}
        isValid={isCategoriesValid}
        required
        attemptedSubmit={attemptedSubmit}
      />
      {/* -------------------- Навык --------------------*/}
      <Select
        type="multiple"
        label="Подкатегория навыка, которому хотите научиться"
        placeholder={selectedCategories.length > 0 ? "Выберите подкатегорию" : "Сначала выберите категорию"}
        value={selectedSkills}
        onChange={handleSkillsChange}
        options={skillOptions}
        disabled={selectedCategories.length === 0}
        error={showSubcategoriesError ? errors.wantToLearn : undefined}
        required
        attemptedSubmit={attemptedSubmit}
        isValid={isSubcategoriesValid}
      />
      {/* -------------------- Кнопки --------------------*/}
      <div className={styles.buttonsBox}>
        <Button
          variant="outline"
          onClick={onBack}
          type="button"
          fullWidth
        >
          Назад
        </Button>
        <Button
          variant="prime"
          type="submit"
          fullWidth
          disabled={!isFormValid}
        >
          Далее
        </Button>
      </div>
    </form>
  );
}
import { validateName, validateLocation, validateBirthDate } from '@/utils/validators';
import { CITY_OPTIONS, CATEGORY_OPTIONS, GENDER_OPTIONS } from '@/constants/options';
import { AvatarLoader } from '@/components/features/AvatarLoader/AvatarLoader';
import { getSubcategoryOptionsForMultiple } from '@/utils/helpers';
import { DatePicker } from '@/components/ui/DatePicker';
import { APP_SUBCATEGORIES } from '@/constants/skills';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Step2FormProps } from './type';
import styles from './Step2Form.module.css';
import type { TCity } from '@/types/types';
import { useForm } from '@/hooks/useForm';
import { useRef, useState } from 'react';

// ---------------------------------------------------------------

export function Step2Form({
  initialData,
  onSubmit,
  onBack
}: Step2FormProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatar?.preview || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

// ---------------------------------------------------------------

  const {
    values: formData,
    getError,
    isValid,
    attemptedSubmit,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues: {
      name: initialData?.name || '',
      age: initialData?.age || 0,
      birthDate: initialData?.birthDate || null,
      gender: initialData?.gender || 'any',
      location: initialData?.location || '',
      selectedCategories: initialData?.selectedCategories || [],
      wantToLearn: initialData?.wantToLearn || [],
    },
    validators: {
      name: validateName,
      birthDate: validateBirthDate,
      location: validateLocation,
    },
    onSubmit: (data) => {
      onSubmit({
        avatar: (avatarFile && avatarPreview) ? { file: avatarFile, preview: avatarPreview } : null,
        name: data.name,
        age: data.age,
        birthDate: data.birthDate,
        gender: data.gender,
        location: data.location as TCity,
        selectedCategories: data.selectedCategories,
        wantToLearn: data.wantToLearn,
      });
    },
  });

// ---------------------------------------------------------------

  const selectedCategories = formData.selectedCategories;
  const selectedSkills = formData.wantToLearn.map(s => s.subcategoryId);
  const availableSubcategories = getSubcategoryOptionsForMultiple(selectedCategories);

// ---------------------------------------------------------------

  const isFormValid = isValid('name')
                    && isValid('age')
                    && isValid('birthDate')
                    && isValid('location')
                    && selectedCategories.length > 0
                    && selectedSkills.length > 0;

// ---------------------------------------------------------------

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setAvatarFile(file);
    }
  };

// ---------------------------------------------------------------

  const handleCategoriesChange = (value: string | string[]) => {
    const newCategories = value as string[];
    const removedCategories = selectedCategories.filter(cat => !newCategories.includes(cat));

    const remainingSkills = formData.wantToLearn.filter(skill =>
      !removedCategories.includes(skill.categoryId)
    );

    setValues(prev => ({
      ...prev,
      selectedCategories: newCategories,
      wantToLearn: remainingSkills,
    }));
  };

// ---------------------------------------------------------------

  const handleSkillsChange = (value: string | string[]) => {
    const skillIds = value as string[];

    const wantToLearn = skillIds.map(skillId => {
      const skill = APP_SUBCATEGORIES.find(s => s.id === skillId);
      return {
        categoryId: skill?.categoryId || '',
        subcategoryId: skillId,
      };
    });

    setValues(prev => ({ ...prev, wantToLearn }));
  };

// ---------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
      noValidate
    >
      {/* ---------- Аватар ---------- */}
      <AvatarLoader
        ref={fileInputRef}
        variant="registerForm"
        onChange={handleAvatarChange}
        previewUrl={avatarPreview}
      />

      {/* ---------- Имя ---------- */}
      <Input
        label="Имя"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={getError('name')}
        isValid={isValid('name')}
      />

      {/* ---------- Дата рождения / Пол ---------- */}
      <div className={styles.rowContainer}>
        <DatePicker
          name="birthDate"
          placeholder="дд.мм.гггг"
          startYear={1950}
          endYear={new Date().getFullYear()}
          value={formData.birthDate ? new Date(formData.birthDate) : null}
          error={getError('birthDate')}
          onChange={(result) => {
            if (result.date !== null) {
              handleChange('birthDate', result.date);
            } else {
              handleChange('birthDate', null);
            }
          }}
        />
        <Select
          type="single"
          label="Пол"
          value={formData.gender}
          onChange={(g) => handleChange('gender', g)}
          options={GENDER_OPTIONS}
          isValid
        />
      </div>

      {/* ---------- Город ---------- */}
      <Select
        type="single"
        label="Город"
        value={formData.location}
        onChange={(l) => handleChange('location', l)}
        options={CITY_OPTIONS}
        error={getError('location')}
        isValid={isValid('location')}
        required
        attemptedSubmit={attemptedSubmit}
      />

      {/* ---------- Категория ---------- */}
      <Select
        type="multiple"
        label="Категория навыка, которому хотите научиться"
        value={selectedCategories}
        onChange={handleCategoriesChange}
        options={CATEGORY_OPTIONS}
        isValid={selectedCategories.length > 0}
        required
        attemptedSubmit={attemptedSubmit}
      />

      {/* ---------- Навык ---------- */}
      <Select
        type="multiple"
        label="Подкатегория навыка, которому хотите научиться"
        value={selectedSkills}
        onChange={handleSkillsChange}
        options={availableSubcategories}
        disabled={selectedCategories.length === 0}
        isValid={selectedSkills.length > 0}
        required
        attemptedSubmit={attemptedSubmit}
      />

      {/* ---------- Кнопки ---------- */}
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
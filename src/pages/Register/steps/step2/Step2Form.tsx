import { CITY_OPTIONS, CATEGORY_OPTIONS, GENDER_OPTIONS } from '@/constants/options';
import { validateName, validateAge, validateLocation } from '@/utils/validators';
import { AvatarLoader } from '@/components/features/AvatarLoader/AvatarLoader';
import { getSubcategoryOptions } from '@/utils/helpers';
import { APP_SUBCATEGORIES } from '@/constants/skills';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Step2FormProps } from './type';
import styles from './Step2Form.module.css';
import type { TCity } from '@/types/types';
import { useForm } from '@/hooks/useForm';
import { useRef, useState } from 'react';


export function Step2Form({
  initialData,
  onSubmit,
  onBack
}: Step2FormProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatar?.preview || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialData?.wantToLearn?.map(s => s.subcategoryId) || []
  );
  const availableSubcategories = getSubcategoryOptions(selectedCategories[0] || '');

  const {
    values: formData,
    getError,
    isValid,
    attemptedSubmit,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues: {
      name: initialData?.name || '',
      age: initialData?.age || 0,
      gender: initialData?.gender || 'any',
      location: initialData?.location || '',
      about: initialData?.about || '',
      wantToLearn: initialData?.wantToLearn || [],
    },
    validators: {
      name: validateName,
      age: validateAge,
      location: validateLocation,
    },
    onSubmit: (data) => {
      onSubmit({
        avatar: (avatarFile && avatarPreview) ? { file: avatarFile, preview: avatarPreview } : null,
        ...data,
        location: data.location as TCity,
      });
    },
  });

// ---------------------------------------------------------------

  const isFormValid = isValid('name')
                    && isValid('age')
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
    const categoryIds = value as string[];
    setSelectedCategories(categoryIds);
    setSelectedSkills([]);
    setValues(prev => ({ ...prev, wantToLearn: [] }));
  };

// ---------------------------------------------------------------

  const handleSkillsChange = (value: string | string[]) => {
    const skillIds = value as string[];
    setSelectedSkills(skillIds);
    const wantToLearn = skillIds.map(skillId => ({
      categoryId: APP_SUBCATEGORIES.find(s => s.id === skillId)?.categoryId || '',
      subcategoryId: skillId,
    }));
    setValues(prev => ({ ...prev, wantToLearn }));
  };

// ---------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
      noValidate
    >
      <AvatarLoader
        ref={fileInputRef}
        variant="registerForm"
        onChange={handleAvatarChange}
        previewUrl={avatarPreview}
      />

      <Input
        label="Имя"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        error={getError('name')}
        isValid={isValid('name')}
      />

      <div className={styles.rowContainer}>
        <Input
          type="number"
          label="Возраст"
          value={formData.age === 0 ? '' : String(formData.age)}
          onChange={(e) => handleChange('age', e.target.value ? Number(e.target.value) : 0)}
          onBlur={() => handleBlur('age')}
          error={getError('age')}
          isValid={isValid('age')}
        />
        <Select
          type="single"
          label="Пол"
          value={formData.gender}
          onChange={(v) => handleChange('gender', v)}
          options={GENDER_OPTIONS}
        />
      </div>

      <Select
        type="single"
        label="Город"
        value={formData.location}
        onChange={(v) => handleChange('location', v)}
        onBlur={() => handleBlur('location')}
        options={CITY_OPTIONS}
        error={getError('location')}
        isValid={isValid('location')}
        required
        attemptedSubmit={attemptedSubmit}
      />

      <Select
        type="multiple"
        label="Категория навыка"
        value={selectedCategories}
        onChange={handleCategoriesChange}
        options={CATEGORY_OPTIONS}
        isValid={selectedCategories.length > 0}
        required
        attemptedSubmit={attemptedSubmit}
      />

      <Select
        type="multiple"
        label="Навык"
        value={selectedSkills}
        onChange={handleSkillsChange}
        options={availableSubcategories}
        disabled={selectedCategories.length === 0}
        isValid={selectedSkills.length > 0}
        required
        attemptedSubmit={attemptedSubmit}
      />

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
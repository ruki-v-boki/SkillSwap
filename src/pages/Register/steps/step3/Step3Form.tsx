import { APP_CATEGORIES, APP_SUBCATEGORIES } from '@/constants/skills';
import { useState, useRef, useCallback } from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Step3FormProps } from './type';
import styles from './Step3Form.module.css';


export function Step3Form({
  initialData,
  onSubmit,
  onBack
}: Step3FormProps) {

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

// ---------------------------------------------------------------

  const [formData, setFormData] = useState({
    customName: initialData?.customName || '',
    categoryId: initialData?.categoryId || '',
    subcategoryId: initialData?.subcategoryId || '',
    description: initialData?.description || '',
    images: initialData?.images || [] as File[],
  });

  const [errors, setErrors] = useState<{
    customName?: string;
    categoryId?: string;
    subcategoryId?: string;
    description?: string;
  }>({});

  const [touched, setTouched] = useState<{
    customName: boolean;
    categoryId: boolean;
    subcategoryId: boolean;
    description: boolean;
  }>({
    customName: false,
    categoryId: false,
    subcategoryId: false,
    description: false,
  });

// ---------------------------------------------------------------

  const categoryOptions = APP_CATEGORIES.map(category => ({
    value: category.id,
    label: category.name,
  }));

// ---------------------------------------------------------------

  const availableSubcategories = APP_SUBCATEGORIES.filter(
    sub => sub.categoryId === formData.categoryId
  );

  const subcategoryOptions = availableSubcategories.map(subcategory => ({
    value: subcategory.id,
    label: subcategory.name,
  }));

// ---------------------------------------------------------------

  const handleCustomNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, customName: value }));
    setErrors(prev => ({ ...prev, customName: undefined }));
  };

  const handleCategoryChange = (value: string | string[]) => {
    const categoryId = value as string;
    setFormData(prev => ({ ...prev, categoryId, subcategoryId: '' }));
    setTouched(prev => ({ ...prev, categoryId: true, subcategoryId: true }));
    setErrors(prev => ({ ...prev, categoryId: undefined, subcategoryId: undefined }));
  };

  const handleSubcategoryChange = (value: string | string[]) => {
    const subcategoryId = value as string;
    setFormData(prev => ({ ...prev, subcategoryId }));
    setTouched(prev => ({ ...prev, subcategoryId: true }));
    setErrors(prev => ({ ...prev, subcategoryId: undefined }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
    setErrors(prev => ({ ...prev, description: undefined }));
  };

// ---------------------------------------------------------------

  const validateCustomName = (value: string): string | undefined => {
    if (value.trim() === '') return 'Название навыка обязательно';
    if (value.length < 3) return 'Название должно быть не менее 3 символов';
    return undefined;
  };

  const validateCategoryId = (value: string): string | undefined => {
    if (value === '') return 'Выберите категорию';
    return undefined;
  };

  const validateSubcategoryId = (value: string): string | undefined => {
    if (value === '') return 'Выберите подкатегорию';
    return undefined;
  };

  const validateDescription = (value: string): string | undefined => {
    if (value.trim() === '') return 'Описание обязательно';
    if (value.length < 20) return 'Описание должно быть не менее 20 символов';
    return undefined;
  };

// ---------------------------------------------------------------

  const isCustomNameValid = formData.customName.trim() !== '' && !validateCustomName(formData.customName);
  const isCategoryIdValid = formData.categoryId !== '' && !validateCategoryId(formData.categoryId);
  const isSubcategoryIdValid = formData.subcategoryId !== '' && !validateSubcategoryId(formData.subcategoryId);
  const isDescriptionValid = formData.description.trim() !== '' && !validateDescription(formData.description);
  const isFormValid = isCustomNameValid && isCategoryIdValid && isSubcategoryIdValid && isDescriptionValid;

// ---------------------------------------------------------------

  const showCustomNameError = errors.customName && (touched.customName || attemptedSubmit);
  const showCategoryIdError = errors.categoryId && (touched.categoryId || attemptedSubmit);
  const showSubcategoryIdError = errors.subcategoryId && (touched.subcategoryId || attemptedSubmit);
  const showDescriptionError = errors.description && (touched.description || attemptedSubmit);

// ---------------------------------------------------------------

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
        const previewUrl = URL.createObjectURL(file);
        validPreviews.push(previewUrl);
      }
    });

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    setImagePreviews(prev => [...prev, ...validPreviews]);
  }, []);

// ---------------------------------------------------------------

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

// ---------------------------------------------------------------

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

// ---------------------------------------------------------------

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);

    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

// ---------------------------------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    setTouched({
      customName: true,
      categoryId: true,
      subcategoryId: true,
      description: true,
    });

    const customNameError = validateCustomName(formData.customName);
    const categoryIdError = validateCategoryId(formData.categoryId);
    const subcategoryIdError = validateSubcategoryId(formData.subcategoryId);
    const descriptionError = validateDescription(formData.description);

    setErrors({
      customName: customNameError,
      categoryId: categoryIdError,
      subcategoryId: subcategoryIdError,
      description: descriptionError,
    });

    if (!customNameError && !categoryIdError && !subcategoryIdError && !descriptionError) {
      onSubmit({
        customName: formData.customName,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        description: formData.description,
        images: formData.images,
      });
    }
  };

// ---------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
      noValidate
    >
      {/* -------------------- Название -------------------- */}
      <Input
        label="Название навыка"
        placeholder="Введите название вашего навыка"
        value={formData.customName}
        onChange={(e) => handleCustomNameChange(e.target.value)}
        onBlur={() => setTouched(prev => ({ ...prev, customName: true }))}
        error={showCustomNameError ? errors.customName : undefined}
        isValid={isCustomNameValid}
        required
      />
      {/* -------------------- Категория -------------------- */}
      <Select
        type="single"
        label="Категория навыка"
        placeholder="Выберите категорию"
        value={formData.categoryId}
        onChange={handleCategoryChange}
        options={categoryOptions}
        error={showCategoryIdError ? errors.categoryId : undefined}
        isValid={isCategoryIdValid}
        required
        attemptedSubmit={attemptedSubmit}
      />
      {/* -------------------- Подкатегория -------------------- */}
      <Select
        type="single"
        label="Подкатегория навыка"
        placeholder={formData.categoryId ? "Выберите подкатегорию" : "Сначала выберите категорию"}
        value={formData.subcategoryId}
        onChange={handleSubcategoryChange}
        options={subcategoryOptions}
        disabled={!formData.categoryId}
        error={showSubcategoryIdError ? errors.subcategoryId : undefined}
        isValid={isSubcategoryIdValid}
        required
        attemptedSubmit={attemptedSubmit}
      />
      {/* -------------------- Описание -------------------- */}
      <div className={styles.textareaBox}>
        <label htmlFor="description" className={`h-body`}>
          Описание
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          placeholder="Коротко опишите, чему можете научить"
          value={formData.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
        />
        {showDescriptionError && (
          <span className={styles.errorMessage}>{errors.description}</span>
        )}
      </div>
      {/* -------------------- Фото -------------------- */}
      <div className={styles.imagesBox}>
        <div
          className={`${styles.imageUpload} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleAreaClick}
        >
          <p className={`${styles.uploadHint} h-body`}>
            {isDragging ? 'Отпустите файлы для загрузки' : 'Перетащите или выберите изображения навыка'}
          </p>
          <div className={styles.dndCaptionBox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.2 10.8a2.6 2.6 0 1 1 0-5 2.6 2.6 0 0 1 0 5m0-3.7a1.2 1.2 0 1 0 0 2.3 1.2 1.2 0 0 0 0-2.3"/>
              <path fill="currentColor" d="M14.8 22H9.2Q2 22.2 2 14.8V9.2Q1.9 2 9.2 2H13q.6 0 .7.7t-.7.7H9.2C5 3.4 3.4 4.9 3.4 9.2v5.6c0 4.3 1.5 5.8 5.8 5.8h5.6c4.3 0 5.8-1.5 5.8-5.8V10q0-.6.7-.7.7.1.7.7v4.7q.2 7.4-7.2 7.2"/>
              <path fill="currentColor" d="M20.6 6.2h-5.1a1 1 0 0 1-.7-.7q0-.7.7-.7h5.1q.6 0 .7.7t-.7.7"/>
              <path fill="currentColor" d="M18 8.7a1 1 0 0 1-.7-.7V3q.1-.8.7-.8t.7.7V8q0 .7-.7.7M3.3 19.2a.7.7 0 0 1-.4-1.3l4.6-3c1-.8 2.4-.7 3.3 0l.3.4q1 .6 1.7 0l4-3.4c.9-.8 2.4-.8 3.4 0l1.6 1.3q.4.5 0 1t-1 .1L19.3 13q-.8-.6-1.7 0l-3.9 3.3c-1 .9-2.5.9-3.5 0L10 16q-.7-.5-1.6 0l-4.6 3z"/>
            </svg>
            <p>Выбрать изображения</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className={styles.hiddenInput}
          />
        </div>

        {/* ---------- Превью загруженных изображений ---------- */}
        {imagePreviews.length > 0 && (
          <div className={styles.previewContainer}>
            {imagePreviews.map((preview, index) => (
              <div key={index} className={styles.previewItem}>
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* -------------------- Кнопки -------------------- */}
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
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
}
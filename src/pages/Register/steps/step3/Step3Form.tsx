import { useState, useRef, useCallback, useEffect } from 'react';
import { getSubcategoryOptions } from '@/utils/helpers';
import { CATEGORY_OPTIONS } from '@/constants/options';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Step3FormProps } from './type';
import styles from './Step3Form.module.css';
import { useForm } from '@/hooks/useForm';
import {
  validateSubcategoryId,
  validateDescription,
  validateCategoryId,
  validateSkillName,
} from '@/utils/validators';

// ---------------------------------------------------------------

export function Step3Form({
  initialData,
  onSubmit,
  onBack
}: Step3FormProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<File[]>(initialData?.images || []);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

// ---------------------------------------------------------------

  useEffect(() => {
    if (initialData?.images && initialData.images.length > 0) {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));

      const newPreviews = initialData.images.map(file => URL.createObjectURL(file));

      setImagePreviews(newPreviews);
      setImages(initialData.images);
    } else if (!initialData?.images || initialData.images.length === 0) {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));

      setImagePreviews([]);
      setImages([]);
    }
  }, [
    initialData?.images,
    imagePreviews
  ]);

// ---------------------------------------------------------------

  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

// ---------------------------------------------------------------

  const {
    values: formData,
    getError,
    isValid,
    attemptedSubmit,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      customName: initialData?.customName || '',
      categoryId: initialData?.categoryId || '',
      subcategoryId: initialData?.subcategoryId || '',
      description: initialData?.description || '',
      images: initialData?.images || [] as File[],
    },
    validators: {
      customName: validateSkillName,
      categoryId: validateCategoryId,
      subcategoryId: validateSubcategoryId,
      description: validateDescription,
    },
    onSubmit: (data) => {
      onSubmit({
        customName: data.customName,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        description: data.description,
        images: images,
      });
    },
  });

// ---------------------------------------------------------------

  const subcategoryOptions = getSubcategoryOptions(formData.categoryId);

// ---------------------------------------------------------------

  const isFormValid = isValid('customName')
                    && isValid('categoryId')
                    && isValid('subcategoryId')
                    && isValid('description');

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

    setImages(prev => [...prev, ...validFiles]);
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
    processFiles(e.dataTransfer.files);
  };

// ---------------------------------------------------------------

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

// ---------------------------------------------------------------

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
    setImages(prev => prev.filter((_, i) => i !== index));
  };

// ---------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
      noValidate
    >
      {/* ---------- Назание ---------- */}
      <Input
        label="Название навыка"
        placeholder="Введите название вашего навыка"
        value={formData.customName}
        onChange={(e) => handleChange('customName', e.target.value)}
        error={getError('customName')}
        isValid={isValid('customName')}
        required
      />

      {/* ---------- Категория ---------- */}
      <Select
        type="single"
        label="Категория навыка"
        placeholder="Выберите категорию"
        value={formData.categoryId}
        onChange={(v) => handleChange('categoryId', v)}
        options={CATEGORY_OPTIONS}
        error={getError('categoryId')}
        isValid={isValid('categoryId')}
        required
        attemptedSubmit={attemptedSubmit}
      />

      {/* ---------- Подкатегория ---------- */}
      <Select
        type="single"
        label="Подкатегория навыка"
        placeholder={formData.categoryId ? "Выберите подкатегорию" : "Сначала выберите категорию"}
        value={formData.subcategoryId}
        onChange={(v) => handleChange('subcategoryId', v)}
        options={subcategoryOptions}
        disabled={!formData.categoryId}
        error={getError('subcategoryId')}
        isValid={isValid('subcategoryId')}
        required
        attemptedSubmit={attemptedSubmit}
      />

      {/* ---------- Описания ---------- */}
      <div className={styles.textareaBox}>
        <label htmlFor="description" className="h-body">
          Описание
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          placeholder="Коротко опишите, чему можете научить"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {getError('description') && (
          <span className={styles.errorMessage}>{getError('description')}</span>
        )}
      </div>

      {/* ---------- Изображения ---------- */}
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

      {/* ---------- Кнопки ---------- */}
      <div className={styles.buttonsBox}>
        <Button
          variant="outline"
          type="button"
          onClick={onBack}
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
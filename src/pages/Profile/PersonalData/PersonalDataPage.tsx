import { selectCurrentUser, selectIsLoading, updateCurrentUser, updateUserEmail } from "@/services/slices/userSlice";
import { CITY_OPTIONS, GENDER_OPTIONS } from "@/constants/options";
import { AvatarLoader } from "@/components/features/AvatarLoader";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "@/services/store";
import type { IUser, TCity, TGender } from "@/types/types";
import { DatePicker } from "@/components/ui/DatePicker";
import { calculateAgeFromDate } from "@/utils/helpers";
import styles from './PersonalDataPage.module.css';
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Loader } from "@/components/ui/Loader";
import { supabase } from "@/services/supabase";
import { Input } from "@/components/ui/Input";
import { useForm } from "@/hooks/useForm";
import {
  validateBirthDate,
  validateLocation,
  validateAbout,
  validateEmail,
  validateName,
} from "@/utils/validators";

// ---------------------------------------------------------------

export function PersonalDataPage() {

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector(selectCurrentUser);
  const isUpdatingLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

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
      email: '',
      name: '',
      birthDate: null as string | null,
      gender: 'any' as TGender,
      location: '' as TCity,
      about: '',
    },
    validators: {
      email: validateEmail,
      name: validateName,
      birthDate: validateBirthDate,
      location: validateLocation,
      about: validateAbout,
    },
    onSubmit: async (data) => {
      if (!user) return;

      setIsSaving(true);
      setSaveSuccess(false);

      const age = calculateAgeFromDate(data.birthDate);

      if (data.email !== user.email) {
        setIsUpdatingEmail(true);
        try {
          await dispatch(updateUserEmail({
            userId: user.id,
            newEmail: data.email
          })).unwrap();
        } catch (error) {
          console.error('Не удалось обновить email:', error);
          setIsUpdatingEmail(false);
          setIsSaving(false);
          return;
        }
        setIsUpdatingEmail(false);
      }

      const profileUpdates: Partial<IUser> = {};
      if (data.name !== user.name) profileUpdates.name = data.name;
      if (age !== user.age) profileUpdates.age = age;
      if (data.birthDate !== user.birthDate) profileUpdates.birthDate = data.birthDate;
      if (data.gender !== user.gender) profileUpdates.gender = data.gender;
      if (data.location !== user.location) profileUpdates.location = data.location;
      if (data.about !== user.about) profileUpdates.about = data.about;

      if (Object.keys(profileUpdates).length > 0) {
        try {
          await dispatch(updateCurrentUser({
            userId: user.id,
            data: profileUpdates
          })).unwrap();
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
          console.error('Не удалось обновить профиль:', error);
        }
      }

      setIsSaving(false);
    },
  });

// ---------------------------------------------------------------

  const [originalValues, setOriginalValues] = useState({
    email: '',
    name: '',
    birthDate: null as string | null,
    gender: 'any' as TGender,
    location: '' as TCity,
    about: '',
  });

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalValues);
  }, [formData, originalValues]);

// ---------------------------------------------------------------

  useEffect(() => {
    if (user) {
      const newValues = {
        email: user.email || '',
        name: user.name || '',
        birthDate: user.birthDate || null,
        gender: user.gender || 'any',
        location: (user.location as TCity) || '' as TCity,
        about: user.about || '',
      };
      setValues(newValues);
      setOriginalValues(newValues);
      setAvatarPreview(user.avatar || null);
    }
  }, [user, setValues]);

// ---------------------------------------------------------------

  const uploadAvatar = async (userId: string, file: File): Promise<string> => {
    const fileName = `${userId}/avatar_${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (uploadError) throw new Error(`Ошибка загрузки аватара: ${uploadError.message}`);
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    return urlData.publicUrl;
  };

// ---------------------------------------------------------------

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    try {
      const avatarUrl = await uploadAvatar(user.id, file);
      await dispatch(updateCurrentUser({
        userId: user.id,
        data: { avatar: avatarUrl }
      })).unwrap();
      URL.revokeObjectURL(preview);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Не удалось загрузить аватар:', error);
      setAvatarPreview(user.avatar || null);
      alert('Не удалось загрузить аватар. Попробуйте позже.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const isSubmitDisabled = !hasChanges || isSaving || isUpdatingEmail || isUploadingAvatar;

// ---------------------------------------------------------------

  return (
    <main className={styles.personalDataContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.profileForm}
        noValidate
      >
        {/* ---------- Почта ---------- */}
        <Input
          label="Почта"
          placeholder="Здесь вы можете изменить свой email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={getError('email')}
          isValid={isValid('email')}
          type="email"
          required
          disabled={isSaving}
          rightIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
              <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
            </svg>
          }
        />

        {/* ---------- Пароль ---------- */}
        <Button
          type="button"
          variant="link"
          style={{ minHeight: '24px', marginTop: '-4px' }}
          disabled={isSaving}
        >
          Изменить пароль
        </Button>

        {/* ---------- Имя ---------- */}
        <Input
          label="Имя"
          placeholder="Здесь вы можете изменить своё имя"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={getError('name')}
          isValid={isValid('name')}
          required
          disabled={isSaving}
          rightIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
              <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
            </svg>
          }
        />

        {/* ---------- Дата рождения / Пол ---------- */}
        <div className={styles.rowContainer}>
          <DatePicker
            name="birthDate"
            placeholder="дд.мм.гггг"
            startYear={1950}
            endYear={2026}
            value={formData.birthDate ? new Date(formData.birthDate) : null}
            error={getError('birthDate')}
            disabled={isSaving}
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
            placeholder="Не указан"
            value={formData.gender}
            onChange={(v) => handleChange('gender', v)}
            options={GENDER_OPTIONS}
            disabled={isSaving}
            isValid
          />
        </div>

        {/* ---------- Город ---------- */}
        <Select
          type="single"
          label="Город"
          placeholder="Не указан"
          value={formData.location}
          onChange={(v) => handleChange('location', v)}
          options={CITY_OPTIONS}
          error={getError('location')}
          isValid={isValid('location')}
          required
          disabled={isSaving}
          attemptedSubmit={attemptedSubmit}
        />

        {/* ---------- О себе ---------- */}
        <div className={styles.textareaBox}>
          <label className="h-body">О себе</label>
          <textarea
            className={styles.textarea}
            placeholder="Добавьте информацию о себе"
            value={formData.about}
            onChange={(e) => handleChange('about', e.target.value)}
            disabled={isSaving}
          />
          <svg className={styles.textareaIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
            <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
          </svg>
          {getError('about') && <span className={styles.error}>{getError('about')}</span>}
        </div>

        {/* ---------- Кнопки ---------- */}
        <div className={styles.buttonsBox}>
          <Button
            variant="prime"
            type="submit"
            fullWidth
            disabled={isSubmitDisabled}
          >
            {isSaving ? 'Сохранение...' : !hasChanges ? 'Нет изменений' : 'Сохранить изменения'}
          </Button>
        </div>

      {/* ---------- Индикаторы загрузки---------- */}
      {(isUpdatingLoading && !isUploadingAvatar) && <Loader />}
      {saveSuccess && (
        <div className={styles.successMessage}>
         <p className="h-body">Данные успешно сохранены!</p>
        </div>
      )}

      </form>

      {/* ---------- Аватар ---------- */}
      <AvatarLoader
        ref={fileInputRef}
        variant="profileForm"
        previewUrl={avatarPreview || user?.avatar}
        onChange={handleAvatarChange}
        isLoading={isUploadingAvatar}
      />
    </main>
  );
}
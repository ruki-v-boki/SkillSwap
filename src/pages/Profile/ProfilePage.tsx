import { selectUser, updateUser, updateUserEmail } from '@/services/slices/auth/authSlice';
import { AvatarLoader } from '@/components/features/AvatarLoader';
import { useDispatch, useSelector } from '@/services/store';
import { supabase } from '@/services/supabase/client';
import { useState, useEffect, useRef } from 'react';
import type { IUser, TGender } from '@/types/types';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { TCity } from '@/constants/cities';
import styles from './ProfilePage.module.css';
import { Input } from '@/components/ui/Input';
import { CITIES } from '@/constants/cities';


export function ProfilePage() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isFormChange, setIsFormChange] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const cityOptions = CITIES.map(city => ({ value: city, label: city }));

  const genderOptions = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'any', label: 'Не указан' },
  ];

// ---------------------------------------------------------------

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: 0,
    gender: 'any' as TGender,
    location: '' as TCity,
    about: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    age?: string;
    location?: string;
    about?: string;
  }>({});

  const [touched, setTouched] = useState<{
    email: boolean;
    name: boolean;
    age: boolean;
    location: boolean;
    about: boolean;
  }>({
    email: false,
    name: false,
    age: false,
    location: false,
    about: false,
  });

// ---------------------------------------------------------------

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        name: user.name || '',
        age: user.age || 0,
        gender: user.gender || 'any',
        location: (user.location as TCity) || '' as TCity,
        about: user.about || '',
      });

      const isChanged =
        formData.email !== user.email ||
        formData.name !== user.name ||
        formData.age !== user.age ||
        formData.gender !== user.gender ||
        formData.location !== user.location ||
        formData.about !== user.about;

      setAvatarPreview(user.avatar || null);
      setIsFormChange(isChanged);
    }
  }, [formData, user]);

// ---------------------------------------------------------------

  const uploadAvatar = async (userId: string, file: File): Promise<string> => {
    const fileName = `${userId}/avatar_${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (uploadError) {
      throw new Error(`Ошибка загрузки аватара: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
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
      await dispatch(updateUser({ avatar: avatarUrl })).unwrap();
      URL.revokeObjectURL(preview);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      setAvatarPreview(user.avatar || null);
      alert('Не удалось загрузить аватар. Попробуйте позже.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

// ---------------------------------------------------------------

  const validateEmail = (value: string): string | undefined => {
    if (value.trim() === '') return 'Email обязателен';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return 'Введите корректный email';
    return undefined;
  };

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

  const validateAbout = (value: string): string | undefined => {
    if (value.length > 500) return 'Описание не должно превышать 500 символов';
    return undefined;
  };

// ---------------------------------------------------------------

  const isEmailValid = formData.email !== '' && !validateEmail(formData.email);
  const isNameValid = formData.name !== '' && !validateName(formData.name);
  const isAgeValid = formData.age !== 0 && !validateAge(formData.age);
  const isLocationValid = Boolean(formData.location) && !validateLocation(formData.location);

  const showEmailError = errors.email && (touched.email || attemptedSubmit);
  const showNameError = errors.name && (touched.name || attemptedSubmit);
  const showAgeError = errors.age && (touched.age || attemptedSubmit);
  const showLocationError = errors.location && (touched.location || attemptedSubmit);
  const showAboutError = errors.about && (touched.about || attemptedSubmit);


  const validateAll = (): boolean => {
    const emailError = validateEmail(formData.email);
    const nameError = validateName(formData.name);
    const ageError = validateAge(formData.age);
    const locationError = validateLocation(formData.location);
    const aboutError = validateAbout(formData.about);

    setErrors({
      email: emailError,
      name: nameError,
      age: ageError,
      location: locationError,
      about: aboutError,
    });

    return !emailError && !nameError && !ageError && !locationError && !aboutError;
  };

// ---------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    setTouched({
      email: true,
      name: true,
      age: true,
      location: true,
      about: true,
    });

    if (!validateAll() || !user) return;

    if (formData.email !== user.email) {
      setIsUpdatingEmail(true);
      try {
        await dispatch(updateUserEmail(formData.email)).unwrap();
      } catch (error) {
        console.error('Email update failed:', error);
        setErrors(prev => ({ ...prev, email: 'Не удалось обновить email' }));
        setIsUpdatingEmail(false);
        return;
      }
      setIsUpdatingEmail(false);
    }

    const profileUpdates: Partial<IUser> = {};
    if (formData.name !== user.name) profileUpdates.name = formData.name;
    if (formData.age !== user.age) profileUpdates.age = formData.age;
    if (formData.gender !== user.gender) profileUpdates.gender = formData.gender;
    if (formData.location !== user.location) profileUpdates.location = formData.location;
    if (formData.about !== user.about) profileUpdates.about = formData.about;

    if (Object.keys(profileUpdates).length > 0) {
      await dispatch(updateUser(profileUpdates));
    }

    setAttemptedSubmit(false);
  };

// ---------------------------------------------------------------

  if (!user) {
    return <div className={styles.loading}>Загрузка профиля...</div>;
  }

// ---------------------------------------------------------------

  return (
    <main className={styles.profilePage}>
      <section className={styles.profilePageMenu}>
        <span>menu</span>
        <span>menu</span>
        <span>menu</span>
        <span>menu</span>
      </section>

      <section className={styles.profileDetails}>

        <form onSubmit={handleSubmit} className={styles.profileForm} noValidate>
          {/* -------------------- Почта --------------------*/}
          <Input
            label="Почта"
            placeholder="Здесь вы можете изменить свой email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors(prev => ({ ...prev, email: undefined }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            error={showEmailError ? errors.email : undefined}
            isValid={isEmailValid}
            type="email"
            required
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
                <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
              </svg>
            }
          />
          <Button
            type='button'
            variant='link'
            style={{minHeight: '24px', marginTop: '-4px'}}
          >
            Изменить пароль
          </Button>
          {/* -------------------- Имя --------------------*/}
          <Input
            label="Имя"
            placeholder="Здесь вы можете изменить своё имя"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors(prev => ({ ...prev, name: undefined }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
            error={showNameError ? errors.name : undefined}
            isValid={isNameValid}
            required
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
                <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
              </svg>
            }
          />
          {/* -------------------- Возраст + Пол --------------------*/}
          <div className={styles.rowContainer}>
            <Input
              type="number"
              label="Дата рождения"
              placeholder="Укажите дату вашего рождения"
              value={formData.age === 0 ? '' : String(formData.age)}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, age: value ? Number(value) : 0 });
                setErrors(prev => ({ ...prev, age: undefined }));
              }}
              onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
              error={showAgeError ? errors.age : undefined}
              isValid={isAgeValid}
              required
            />

            <Select
              type="single"
              label="Пол"
              placeholder="Не указан"
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value as TGender })}
              options={genderOptions}
            />
          </div>
          {/* -------------------- Город --------------------*/}
          <Select
            type="single"
            label="Город"
            placeholder="Не указан"
            value={formData.location}
            onChange={(value) => {
              setFormData({ ...formData, location: value as TCity });
              setTouched(prev => ({ ...prev, location: true }));
              setErrors(prev => ({ ...prev, location: undefined }));
            }}
            options={cityOptions}
            error={showLocationError ? errors.location : undefined}
            required
            isValid={isLocationValid}
          />
          {/* -------------------- О себе --------------------*/}
          <div className={styles.textareaBox}>
            <label className={`h-body`}>
              О себе
            </label>
            <textarea
              id="about"
              className={styles.textarea}
              placeholder="Добавьте информацию о себе"
              value={formData.about}
              onChange={(e) => {
                setFormData({ ...formData, about: e.target.value });
                setErrors(prev => ({ ...prev, about: undefined }));
              }}
              onBlur={() => setTouched(prev => ({ ...prev, about: true }))}
            />
            <svg className={styles.textareaIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
              <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
            </svg>
            {showAboutError && <span className={styles.error}>{errors.about}</span>}
          </div>
          {/* -------------------- Кнопка --------------------*/}
          <div className={styles.buttonsBox}>
            <Button
              variant="prime"
              type="submit"
              fullWidth
              disabled={!isFormChange || isUpdatingEmail}
            >
              {isUpdatingEmail ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </div>
        </form>
        {/* -------------------- Фото (независимый компонент) --------------------*/}
        <AvatarLoader
          ref={fileInputRef}
          variant="profileForm"
          previewUrl={avatarPreview || user.avatar}
          onChange={handleAvatarChange}
          isLoading={isUploadingAvatar}
        />
      </section>
    </main>
  );
}
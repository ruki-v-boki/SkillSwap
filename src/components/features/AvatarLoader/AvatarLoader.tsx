import type { AvatarLoaderProps } from './type';
import styles from './AvatarLoader.module.css';
import { forwardRef } from 'react';


export const AvatarLoader = forwardRef<HTMLInputElement, AvatarLoaderProps>(({
  variant,
  onChange,
  previewUrl,
}, ref) => {
// ---------------------------------------------------------------

  const handleClick = () => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.click();
    }
  };

// ---------------------------------------------------------------

  return (
    <>
      {variant === 'registerForm' && (
        <div className={styles.avatarContainerRegister}>
          <div
            className={styles.wrapper}
            onClick={handleClick}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Аватар"
                className={styles.avatarPreview}
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 56 56">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M45.7 48a22.5 22.5 0 0 0-35.9 0m35.9 0a27 27 0 1 0-35.9 0m35.9 0a27 27 0 0 1-35.9 0m27-27a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/>
              </svg>
            )}

            <button
              type="button"
              className={styles.loadButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <rect width="16" height="16" fill="none" rx="8"/>
                <path fill="currentColor" d="M12 8.5H4a.5.5 0 0 1-.5-.5c0-.27.23-.5.5-.5h8c.27 0 .5.23.5.5a.5.5 0 0 1-.5.5"/>
                <path fill="currentColor" d="M8 12.5a.5.5 0 0 1-.5-.5V4c0-.27.23-.5.5-.5s.5.23.5.5v8a.5.5 0 0 1-.5.5"/>
              </svg>
            </button>

            <input
              ref={ref}
              type="file"
              accept="image/*"
              className={styles.input}
              onChange={onChange}
            />
          </div>
        </div>
      )}

      {variant === 'profileForm' && (
        <div className={styles.avatarContainerProfile}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Аватар"
              className={styles.avatarPreviewProfile}
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 56 56">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M45.7 48a22.5 22.5 0 0 0-35.9 0m35.9 0a27 27 0 1 0-35.9 0m35.9 0a27 27 0 0 1-35.9 0m27-27a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/>
            </svg>
          )}
          <button
            type="button"
            className={styles.editButton}
            onClick={handleClick}
          >
            Редактировать
          </button>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
});

AvatarLoader.displayName = 'AvatarLoader';
import { Loader } from '@/components/ui/Loader';
import type { AvatarLoaderProps } from './type';
import styles from './AvatarLoader.module.css';
import { forwardRef } from 'react';


export const AvatarLoader = forwardRef<HTMLInputElement, AvatarLoaderProps>(({
  variant,
  onChange,
  previewUrl,
  isLoading = false,
}, ref) => {

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
            {isLoading ? (
              <Loader />
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="Аватар"
                className={styles.avatarPreview}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                fill="none"
                viewBox="0 0 56 56"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M45.7 48a22.5 22.5 0 0 0-35.9 0m35.9 0a27 27 0 1 0-35.9 0m35.9 0a27 27 0 0 1-35.9 0m27-27a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
                />
              </svg>
            )}

            <button
              type="button"
              className={styles.loadButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              disabled={isLoading}
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

      {/* ---------------------------------------------------- */}

      {variant === 'profileForm' && (
        <div className={styles.wrapperProfile}>
          {isLoading ? (
            <Loader />
          ) : previewUrl ? (
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
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.2 10.8a2.6 2.6 0 1 1 0-5 2.6 2.6 0 0 1 0 5m0-3.7a1.2 1.2 0 1 0 0 2.3 1.2 1.2 0 0 0 0-2.3"/>
              <path fill="currentColor" d="M14.8 22H9.2Q2 22.2 2 14.8V9.2Q1.9 2 9.2 2H13q.7 0 .7.7t-.7.7H9.2C5 3.4 3.4 4.9 3.4 9.2v5.6c0 4.3 1.5 5.8 5.8 5.8h5.6c4.3 0 5.8-1.5 5.8-5.8V10q0-.6.7-.7.6.1.7.7v4.7q.1 7.4-7.2 7.2"/>
              <path fill="currentColor" d="M15.4 10q-.6 0-1-.5t-.3-1.1l.2-1.3q0-.5.5-1l3.4-3.4c1.3-1.3 2.5-.5 3 0q.9.9.8 1.8 0 .7-.7 1.3l-3.4 3.4-1 .5-1.3.2zm3.7-6.3-3.3 3.4-.1.2-.2 1.2 1.2-.2h.2l3.4-3.4.3-.6-.3-.6q-.6-.6-1.2 0"/>
              <path fill="currentColor" d="M20.3 6.5H20A4 4 0 0 1 17.5 4q-.1-.6.5-.8t.8.4q.5 1.3 1.7 1.7.6.2.5.8-.2.5-.7.5m-17 12.6a.7.7 0 0 1-.4-1.3l4.6-3c1-.8 2.4-.7 3.3 0l.3.4q1 .6 1.7 0l3.9-3.4c1-.8 2.5-.8 3.5 0l1.6 1.3q.4.5 0 1t-1 .1L19.3 13q-.8-.6-1.7 0l-3.9 3.3c-1 .9-2.5.9-3.5 0L10 16q-.7-.5-1.6 0l-4.6 3z"/>
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
      )}
    </>
  );
});

AvatarLoader.displayName = 'AvatarLoader';
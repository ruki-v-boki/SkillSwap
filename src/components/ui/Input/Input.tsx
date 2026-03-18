import type { InputProps } from './type';
import styles from './Input.module.css';
import { forwardRef, useState } from 'react';


export const Input = forwardRef<HTMLInputElement, InputProps> (({
  type = 'search',
  value,
  placeholder,
  name,
  id,
  label,
  error,
  helper,
  required = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  className = '',
  leftIcon,
  rightIcon,
  hideLeftIconOnFocus = true,
}, ref) => {
  const [focused, setFocused] = useState(false);

// ---------------------------------------------------------------

  const inputClasses = [
    styles.input,
    error ? styles.error : '',
    focused ? styles.focused : '',
    leftIcon ? styles.withLeftIcon : '',
    rightIcon ? styles.withRightIcon : '',
    (focused && hideLeftIconOnFocus && leftIcon) ? styles.leftIconHidden : '',
    className,
  ].filter(Boolean).join(' ');

// ---------------------------------------------------------------

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

// ---------------------------------------------------------------

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span className={`${styles.leftIcon} ${focused && hideLeftIconOnFocus ? styles.hidden : ''}`}>
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          className={inputClasses}
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
      {helper && !error && <span className={styles.helper}>{helper}</span>}
    </div>
  );
})
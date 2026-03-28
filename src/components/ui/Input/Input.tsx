import { forwardRef, useState } from 'react';
import type { InputProps } from './type';
import styles from './Input.module.css';

// ---------------------------------------------------------------

export const Input = forwardRef<HTMLInputElement, InputProps> (({
  type,
  value,
  placeholder,
  name,
  id,
  label,
  error,
  isValid = false,
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
  const hasValue = Boolean(value && value.length > 0);
  const shouldHideIcon = hasValue || (focused && hideLeftIconOnFocus && !hasValue);

// ---------------------------------------------------------------

  const inputClasses = [
    styles.input,
    error ? styles.error : '',
    focused ? styles.focused : '',
    leftIcon ? styles.withLeftIcon : '',
    rightIcon ? styles.withRightIcon : '',
    shouldHideIcon ? styles.leftIconHidden : '',
    isValid && !error ? styles.valid : '',
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
        <label className={`${styles.label} h-body`} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span className={`${styles.leftIcon} ${shouldHideIcon ? styles.hidden : ''}`}>
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
          autoComplete="off"
        />

        {rightIcon && (
          <span className={styles.rightIconBox}>{rightIcon}</span>
        )}
        {error && (
          <span className={`${styles.errorMessage} h-caption`}>{error}</span>
        )}
      </div>
    </div>
  );
})
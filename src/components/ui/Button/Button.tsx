import type { ButtonProps } from "./type";
import styles from './Button.module.css';
import { forwardRef } from "react";

// ---------------------------------------------------------------

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'base',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style,
  className = ''
}, ref) => {

// ---------------------------------------------------------------

  const buttonClasses = [
    styles.button,
    variant && styles[variant],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

// ---------------------------------------------------------------

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading && <span className={styles.loadingItem} />}
      {/* <span className={loading ? styles.loading : ''}>
        {loading ? 'Загрузка...' : children}
      </span> */}
      {children}
    </button>
  )
})

Button.displayName = 'Button';
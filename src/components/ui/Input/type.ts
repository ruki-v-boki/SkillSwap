import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

export type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  value?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hideLeftIconOnFocus?: boolean;
}
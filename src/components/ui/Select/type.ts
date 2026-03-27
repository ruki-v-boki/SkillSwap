type Option = {
  value: string;
  label: string;
}

// ---------------------------------------------------------------

export type SelectProps = {
  type?: 'single' | 'multiple';
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur?: () => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  attemptedSubmit?: boolean;
  isValid?: boolean;
}
export type DatePickerProps = {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (result: {
    date: string | null;
    age: number | null;
    isValid: boolean;
    error?: string;
  }) => void;
  defaultValue?: Date | null;
  startYear?: number;
  endYear?: number;
  value?: Date | null;
  error?: string;
  onBlur?: () => void;
}

// ---------------------------------------------------------------

export type DatePickerRef = {
  openCalendar: () => void;
  closeCalendar: () => void;
  getValue: () => Date | null;
  getAge: () => number | null;
  clear: () => void;
  getError: () => string | undefined;
}
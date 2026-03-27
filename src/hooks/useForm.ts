import { useState, useEffect } from 'react';

// ---------------------------------------------------------------

interface UseFormProps<T> {
  initialValues: T;
  validators?: Partial<Record<keyof T, (value: any) => string | undefined>>;
  onSubmit: (values: T) => void | Promise<void>;
}

// ---------------------------------------------------------------

export function useForm<T extends Record<string, any>>({
  initialValues,
  validators = {},
  onSubmit,
}: UseFormProps<T>) {

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

// ---------------------------------------------------------------

  const isValid = (name: keyof T): boolean => {
    return values[name] !== undefined && values[name] !== '' && !errors[name];
  };

// ---------------------------------------------------------------

  const getError = (name: keyof T): string | undefined => {
    return attemptedSubmit ? errors[name] : undefined;
  };

// ---------------------------------------------------------------

  const validateField = (name: keyof T, value: any): string | undefined => {
    const validator = validators[name];
    return validator ? validator(value) : undefined;
  };

// ---------------------------------------------------------------

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(values) as Array<keyof T>).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

// ---------------------------------------------------------------

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

// ---------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (validateAll()) {
      await onSubmit(values);
      setAttemptedSubmit(false);
    }
  };

// ---------------------------------------------------------------

  useEffect(() => {
    setIsChanged(JSON.stringify(values) !== JSON.stringify(initialValues));
  }, [values, initialValues]);

// ---------------------------------------------------------------

  return {
    values,
    errors,
    isChanged,
    attemptedSubmit,
    handleChange,
    handleSubmit,
    getError,
    isValid,
    setValues,
  };
};
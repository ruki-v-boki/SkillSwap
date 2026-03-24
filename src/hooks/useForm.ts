import { useState, useEffect } from 'react';


interface UseFormProps<T> {
  initialValues: T;
  validators?: Partial<Record<keyof T, (value: any) => string | undefined>>;
  onSubmit: (values: T) => void | Promise<void>;
}


export function useForm<T extends Record<string, any>>({
  initialValues,
  validators = {},
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

// ---------------------------------------------------------------

  useEffect(() => {
    setIsChanged(JSON.stringify(values) !== JSON.stringify(initialValues));
  }, [values, initialValues]);

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

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

// ---------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);

    if (validateAll()) {
      await onSubmit(values);
      setAttemptedSubmit(false);
    }
  };

// ---------------------------------------------------------------

  const showError = (name: keyof T): boolean => {
    return !!errors[name] && (!!touched[name] || attemptedSubmit);
  };

  const getError = (name: keyof T): string | undefined => {
    return showError(name) ? errors[name] : undefined;
  };

  const isValid = (name: keyof T): boolean => {
    return values[name] !== undefined && values[name] !== '' && !errors[name];
  };

// ---------------------------------------------------------------

  return {
    values,
    setValues,
    touched,
    setTouched,
    errors,
    showError,
    getError,
    isValid,
    isChanged,
    handleChange,
    handleBlur,
    handleSubmit,
    attemptedSubmit,
  };
}
import { useClickOutside } from '@/hooks/useClickOutside';
import { ChevronIcon } from '../ChevronIcon';
import type { SelectProps } from './type';
import styles from './Select.module.css';
import { useState, useRef } from 'react';


export function Select({
  type = 'single',
  id,
  name,
  label,
  error,
  value,
  onBlur,
  options,
  onChange,
  isValid = false,
  disabled = false,
  required = false,
  attemptedSubmit = false,
  placeholder = 'Выберите вариант',
}: SelectProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = id || name;

  useClickOutside(containerRef, () => setIsOpen(false));

// Single mode
// ---------------------------------------------------------------
  const selectedValue = type === 'single' ? (value as string) : '';
  const selectedOption = type === 'single'
    ? options.find(opt => opt.value === selectedValue)
    : undefined;

  const handleSingleSelect = (selectedValue: string) => {
    if (!disabled) {
      onChange(selectedValue);
      setIsOpen(false);
      setTouched(true);
      onBlur?.();
    }
  };

// Multiple mode
// ---------------------------------------------------------------
  const selectedValues = type === 'multiple' ? (value as string[]) : [];
  const handleMultipleToggle = (optionValue: string) => {
    if (disabled) return;

    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];

    onChange(newValues);
    setTouched(true);
    onBlur?.();
  };

// ---------------------------------------------------------------

  const hasSelection = type === 'single'
    ? !!selectedOption 
    : selectedValues.length > 0;

// ---------------------------------------------------------------

  const getDisplayText = () => {
    if (type === 'single') {
      return selectedOption?.label || placeholder;
    } else {
      if (selectedValues.length === 0) return placeholder;

      if (selectedValues.length <= 2) {
        const selectedLabels = selectedValues
          .map(val => options.find(opt => opt.value === val)?.label)
          .filter(Boolean)
          .join(', ');
        return `Выбрано: ${selectedLabels}`;
      }

      return `Выбрано (${selectedValues.length})`;
    }
  };

// ---------------------------------------------------------------

  const showError = error && (touched || attemptedSubmit);
  const showRequiredError = required && !hasSelection && (touched || attemptedSubmit);

// ---------------------------------------------------------------

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setTouched(true);
    }
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className={`${styles.label} h-body`}>
          {label}
        </label>
      )}

      <div className={styles.selectContainer}>
        <button
          type="button"
          id={selectId}
          name={name}
          className={`
            ${styles.triggerButton}
            ${showError || showRequiredError ? styles.error : ''}
            ${isValid && !error && hasSelection ? styles.valid : ''}
            ${disabled ? styles.disabled : ''}
          `}
          onClick={handleTriggerClick}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-required={required}
          aria-invalid={!!showError || showRequiredError}
        >
          <span className={hasSelection ? styles.selected : styles.placeholder}>
            {getDisplayText()}
          </span>
          <ChevronIcon open={isOpen} />
        </button>

        {/* --------------------------------------------------------------- */}

        {isOpen && (
          <div className={styles.dropdownBox}>
            <ul className={styles.dropdown} role="listbox">
              {options.length === 0 ? (
                <li className={styles.empty}>Нет вариантов</li>
              ) : (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={`
                      ${styles.option}
                      ${type === 'single' && selectedValue === option.value ? styles.selectedOption : ''}
                      ${type === 'multiple' && selectedValues.includes(option.value) ? styles.selectedOption : ''}
                    `}
                    onClick={() => {
                      if (type === 'single') {
                        handleSingleSelect(option.value);
                      } else {
                        handleMultipleToggle(option.value);
                      }
                    }}
                    role="option"
                    aria-selected={
                      type === 'single'
                        ? selectedValue === option.value 
                        : selectedValues.includes(option.value)
                    }
                  >
                    {type === 'multiple' && (
                      // <label className={`checkbox`}>
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(option.value)}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                          className={`checkbox`}
                        />
                      // </label>
                    )}
                    <span>{option.label}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {showError && <span className={styles.errorMessage}>{error}</span>}
      {showRequiredError && !error && (
        <span className={styles.errorMessage}>Обязательное поле</span>
      )}
    </div>
  );
}
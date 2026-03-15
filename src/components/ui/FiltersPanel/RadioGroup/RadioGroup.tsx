import { useState, useId } from 'react';
import type { RadioGroupOption, RadioGroupUIProps } from './type';
import styles from './RadioGroup.module.css';


export function RadioGroupUI({
  name,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className = '',
  'data-testid': dataTestId,
}: RadioGroupUIProps) {

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? ''
  );
  const currentValue = isControlled ? controlledValue : internalValue;

// ---------------------------------------------------------------

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

// ---------------------------------------------------------------

  return (
    <div
      className={`${styles.radioGroupContainer} ${className}`.trim()}
      role="radiogroup"
      data-testid={dataTestId}
    >
      {options.map((option) => (
        <RadioOption
          key={option.value}
          name={name}
          option={option}
          checked={currentValue === option.value}
          onChange={handleChange}
          dataTestId={dataTestId}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------

function RadioOption({
  name,
  option,
  checked,
  onChange,
  dataTestId
}: {
  name: string;
  option: RadioGroupOption;
  checked: boolean;
  onChange: (value: string) => void;
  dataTestId?: string;
}) {
  const id = useId();

// ---------------------------------------------------------------

  return (
    <label htmlFor={id} className={styles.optionLabel}>
      <input
        type="radio"
        id={id}
        name={name}
        value={option.value}
        checked={checked}
        onChange={() => onChange(option.value)}
        className={styles.radioInput}
        aria-label={option.label}
        data-testid={dataTestId ? `${dataTestId}-option-${option.value}` : undefined}
      />
      <span className={`${styles.radio} ${checked ? styles.radioChecked : ''}`} aria-hidden>
        {checked && <span className={styles.radioDot} />}
      </span>
      <span className={`${styles.labelText} h-body`}>{option.label}</span>
    </label>
  );
}
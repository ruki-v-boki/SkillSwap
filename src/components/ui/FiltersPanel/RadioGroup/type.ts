export type RadioGroupOption = {
  value: string;
  label: string;
}

export type RadioGroupUIProps = {
  name: string;
  options: readonly RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  'data-testid'?: string;
}
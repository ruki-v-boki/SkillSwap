export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'link' | 'base' | 'prime' | 'outline' | 'custom';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
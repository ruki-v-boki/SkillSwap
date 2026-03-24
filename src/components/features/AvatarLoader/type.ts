export type AvatarLoaderProps = {
  variant: 'registerForm' | 'profileForm';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string | null;
  isLoading?: boolean;
}
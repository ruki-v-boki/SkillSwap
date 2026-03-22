export type Step1FormProps = {
  initialData?: {
    email?: string;
    password?: string;
  };
  onSubmit: (data: { email: string; password: string }) => void;
}
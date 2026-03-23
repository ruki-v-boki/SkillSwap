export type Step3FormProps = {
  initialData?: {
    customName?: string;
    categoryId?: string;
    subcategoryId?: string;
    description?: string;
    images?: File[];
  };
  onSubmit: (data: {
    customName: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    images: File[];
  }) => void;
  onBack: () => void;
}
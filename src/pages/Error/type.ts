export type ErrorPageProps = {
  type?: '404' | '500' | 'error';
  title?: string;
  message?: string;
}
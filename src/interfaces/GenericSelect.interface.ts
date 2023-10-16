export interface Option {
  value: string | number;
  label: string;
}
  
export interface Props<T> {
  name: string;
  options: T[];
}
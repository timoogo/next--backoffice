import { DropdownOption } from '@/types/Options';

export interface DropdownProps {
  description?: string;
  options: DropdownOption[];
  orientation?: 'vertical' | 'horizontal';
  title?: string;
  withIcons?: boolean;
}
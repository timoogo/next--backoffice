export interface PaginatorProps<T> {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  items: T[];
}
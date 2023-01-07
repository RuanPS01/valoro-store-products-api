import { Product } from '@entities/product';

export interface ProductResponse {
  items: Product[];
  page: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}

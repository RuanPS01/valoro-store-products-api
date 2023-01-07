import { Product } from '@entities/product';

export interface ListProductResponse {
  items: Product[];
  page: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}

import { Product } from '@entities/product';
import { FindProductOptions } from '../v1/products/interfaces/find-product-options';
import { ListProductOptions } from '../v1/products/interfaces/list-product-options';
import { ListProductResponse } from '../v1/products/interfaces/list-product-response';

export interface ProductRepositoryPort {
  findOne(findProductOptions: FindProductOptions): Promise<Product>;
  save(entity: Product): Promise<Product>;
  find(listProductOptions: ListProductOptions): Promise<ListProductResponse>;
  paginateProducts(listProducts: Product[], sizeOfPage: number);
}

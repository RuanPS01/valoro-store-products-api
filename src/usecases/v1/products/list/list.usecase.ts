import { right } from '@usecases/helpers/right';
import { LoggerPort } from '@usecases/port/logger.interface';
import { ProductRepositoryPort } from '@usecases/port/product-repository';
import { ProductRequest as ListRequest } from './interfaces/list-request';
import { ProductResponse } from './interfaces/list-response';
import { ProductResponseEither } from './interfaces/list-response-either';

export class ListUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(payload: ListRequest): Promise<ProductResponseEither> {
    const products = await this.productRepository.find(payload);

    const response: ProductResponse = {
      items: products.items,
      page: products.page,
      totalItems: products.totalItems,
      itemsPerPage: products.itemsPerPage,
      totalPages: products.totalPages,
    };
    this.logger.info(
      'ListUseCase execute',
      `The list of products have been getted.`,
    );
    return right(response);
  }
}

import { Product } from '@entities/product';
import { ErrorsService } from '@usecases/errors/errors.service';
import { right } from '@usecases/helpers/right';
import { LoggerPort } from '@usecases/port/logger.interface';
import { ProductRepositoryPort } from '@usecases/port/product-repository';
import mongoose from 'mongoose';
import { RegisterRequest } from './interfaces/register-request';
import { RegisterResponse } from './interfaces/register-response';
import { RegisterResponseEither } from './interfaces/register-response-either';

export class RegisterUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly productRepository: ProductRepositoryPort,
    private readonly errorsService: ErrorsService,
  ) {}

  async execute(payload: RegisterRequest): Promise<RegisterResponseEither> {
    const product: Product = {
      _id: new mongoose.Types.ObjectId(),
      ...payload,
    };

    const newProduct = await this.productRepository.save(product);

    if (!newProduct) {
      this.errorsService.BadRequest({
        message: 'Error to register product. Error on Database',
      });
    }

    const response: RegisterResponse = {
      id: newProduct._id.toString(),
    };

    this.logger.info(
      'RegisterUseCase execute',
      `The product ${payload.name} have been registred.`,
    );
    return right(response);
  }
}

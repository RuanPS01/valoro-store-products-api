import { ErrorsService } from '@usecases/errors/errors.service';
import { right } from '@usecases/helpers/right';
import { LoggerPort } from '@usecases/port/logger.interface';
import { ProductRepositoryPort } from '@usecases/port/product-repository';
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
    const newProduct = await this.productRepository.save(payload);

    if (newProduct) {
      this.errorsService.BadRequest({
        message: 'Error to register product. Error on Database',
      });
    }

    const response: RegisterResponse = {
      id: newProduct._id,
      ownerUserEmail: '',
    };

    this.logger.info(
      'RegisterUseCase execute',
      `The product ${payload.name} have been registred.`,
    );
    return right(response);
  }
}

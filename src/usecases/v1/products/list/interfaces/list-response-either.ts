import { Either } from '@usecases/helpers/either';
import { ErrorResponse } from '@usecases/port/error-response';
import { ProductResponse } from './list-response';

export type ProductResponseEither = Either<ErrorResponse, ProductResponse>;

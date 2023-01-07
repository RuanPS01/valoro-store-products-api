import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { UseCaseProxy } from './usecases-proxy';
import { ProductRepositoryModule } from '@external/orm/repositories/product.repository.module';
import { ProductRepositoryImpl } from '@external/orm/repositories/product.repository';
import { EnvironmentConfigModule } from '@main/config/environment-config/environment-config.module';
import { LoggerImpl } from '@external/logger/logger.service';
import { ErrorsModule } from '@usecases/errors/errors.module';
import { ErrorsService } from '@usecases/errors/errors.service';
import { RegisterUseCase } from '@usecases/v1/products/register/register.usecase';
import { ListUseCase } from '@usecases/v1/products/list/list.usecase';
import { AuthenticateMiddleware } from '@main/middlewares/authenticate-middleware';
import { EnvironmentConfigService } from '@main/config/environment-config/environment-config.service';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    ProductRepositoryModule,
    ErrorsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LIST_USECASES_PROXY = 'ListUseCasesProxy';
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static AUTHENTICATE_MIDDLEWARE = 'AuthenticateMiddleware';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerImpl, ProductRepositoryImpl],
          provide: UsecasesProxyModule.LIST_USECASES_PROXY,
          useFactory: (
            logger: LoggerImpl,
            productRepo: ProductRepositoryImpl,
          ) => new UseCaseProxy(new ListUseCase(logger, productRepo)),
        },
        {
          inject: [LoggerImpl, ProductRepositoryImpl, ErrorsService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            logger: LoggerImpl,
            productRepo: ProductRepositoryImpl,
            errorsService: ErrorsService,
          ) =>
            new UseCaseProxy(
              new RegisterUseCase(logger, productRepo, errorsService),
            ),
        },
        {
          inject: [EnvironmentConfigService, ErrorsService],
          provide: UsecasesProxyModule.AUTHENTICATE_MIDDLEWARE,
          useFactory: (
            configService: EnvironmentConfigService,
            errorsService: ErrorsService,
          ) =>
            new UseCaseProxy(
              new AuthenticateMiddleware(configService, errorsService),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.LIST_USECASES_PROXY,
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.AUTHENTICATE_MIDDLEWARE,
      ],
    };
  }
}

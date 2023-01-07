import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RegisterDto } from './register-dto.class';
import { IsRegisterPresenter } from './register.presenter';

import { UsecasesProxyModule } from '@external/dependency-injection-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@external/dependency-injection-proxy/usecases-proxy';
import { RegisterUseCase } from '@usecases/v1/products/register/register.usecase';
import { AuthenticateMiddleware } from '@main/middlewares/authenticate-middleware';

@Controller('products')
@ApiTags('products')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsRegisterPresenter)
export class RegisterController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
    private readonly registerUsecaseProxy: UseCaseProxy<RegisterUseCase>,
    @Inject(UsecasesProxyModule.AUTHENTICATE_MIDDLEWARE)
    private readonly authenticateMiddleware: UseCaseProxy<AuthenticateMiddleware>,
  ) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ description: 'register' })
  async register(@Req() request: Request, @Body() payload: RegisterDto) {
    const authenticatedUserData = await this.authenticateMiddleware
      .getInstance()
      .auth(request.headers.authorization);
    const { data } = await this.registerUsecaseProxy.getInstance().execute({
      sellerUserId: authenticatedUserData.id,
      sellerUserEmail: authenticatedUserData.email,
      category: payload.category,
      rarity: payload.rarity,
      name: payload.name,
      promotionPercent: payload.promotionPercent,
      spotPrice: payload.spotPrice,
      forwardPrice: payload.forwardPrice,
      maxInstallmentsInterestFree: payload.maxInstallmentsInterestFree,
      collectionName: payload.collectionName,
      origin: payload.origin,
      resources: payload.resources,
      image: payload.image,
    });
    return data;
  }
}

import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { RegisterUseCase } from '@usecases/v1/auth/register/register.usecase';
import { JwtAuthGuard } from '@main/guards/jwtAuth.guard';

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
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ description: 'register' })
  async register(@Body() payload: RegisterDto) {
    const { data } = await this.registerUsecaseProxy.getInstance().execute({
      category: payload.category,
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

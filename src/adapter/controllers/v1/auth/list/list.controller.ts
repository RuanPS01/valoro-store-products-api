import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ListDto } from './list-dto.class';
import { IsListPresenter } from './list.presenter';

import { UsecasesProxyModule } from '@external/dependency-injection-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@external/dependency-injection-proxy/usecases-proxy';
import { ListUseCase } from '@usecases/v1/auth/list/list.usecase';

@Controller('products')
@ApiTags('products')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsListPresenter)
export class ListController {
  constructor(
    @Inject(UsecasesProxyModule.LIST_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<ListUseCase>,
  ) {}

  @Get('list')
  @ApiBearerAuth()
  @ApiBody({ type: ListDto })
  @ApiOperation({ description: 'list' })
  async list(@Query() payload: ListDto) {
    const { data } = await this.loginUsecaseProxy.getInstance().execute({
      category: payload.category,
      inPromotion: payload.inPromotion,
      promotionPercentMin: payload.promotionPercentMin,
      spotPriceMax: payload.spotPriceMax,
      spotPriceMin: payload.spotPriceMin,
      forwardPriceMax: payload.forwardPriceMax,
      forwardPriceMin: payload.forwardPriceMin,
      maxInstallmentsInterestFreeMin: payload.maxInstallmentsInterestFreeMin,
      collectionName: payload.collectionName,
      origin: payload.origin,
      haveResources: payload.haveResources,
      itemsPerPage: payload.itemsPerPage,
      page: payload.page,
    });
    return data;
  }
}

import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ListDto } from './list-dto.class';
// import { IsListPresenter } from './list.presenter';

import { UsecasesProxyModule } from '@external/dependency-injection-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@external/dependency-injection-proxy/usecases-proxy';
import { ListUseCase } from '@usecases/v1/products/list/list.usecase';
import { IsListPresenter } from './list.presenter';

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
    private readonly listUsecaseProxy: UseCaseProxy<ListUseCase>,
  ) {}

  @Get('list')
  @ApiQuery({ type: ListDto })
  @ApiOperation({ description: 'list' })
  async list(@Query() payload: ListDto) {
    const { data } = await this.listUsecaseProxy.getInstance().execute({
      sellerUserId: payload.sellerUserId,
      sellerUserEmail: payload.sellerUserEmail,
      order: payload.order,
      referenceOrder: payload.referenceOrder,
      name: payload.name,
      category: payload.category,
      inPromotion: Boolean(payload.inPromotion),
      promotionPercentMin: Number(payload.promotionPercentMin),
      spotPriceMax: Number(payload.spotPriceMax),
      spotPriceMin: Number(payload.spotPriceMin),
      forwardPriceMax: Number(payload.forwardPriceMax),
      forwardPriceMin: Number(payload.forwardPriceMin),
      maxInstallmentsInterestFreeMin: Number(
        payload.maxInstallmentsInterestFreeMin,
      ),
      collectionName: payload.collectionName,
      origin: payload.origin,
      haveResources: Boolean(payload.haveResources),
      itemsPerPage: Number(payload.itemsPerPage),
      page: Number(payload.page),
    });
    return data;
  }
}

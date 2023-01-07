import { ApiProperty } from '@nestjs/swagger';

export class IsListPresenter {
  @ApiProperty()
  category?: string;
  @ApiProperty()
  inPromotion?: boolean;
  @ApiProperty()
  promotionPercentMin?: number;
  @ApiProperty()
  spotPriceMax?: number;
  @ApiProperty()
  spotPriceMin?: number;
  @ApiProperty()
  forwardPriceMax?: number;
  @ApiProperty()
  forwardPriceMin?: number;
  @ApiProperty()
  maxInstallmentsInterestFreeMin?: number;
  @ApiProperty()
  collectionName?: string;
  @ApiProperty()
  origin?: string;
  @ApiProperty()
  haveResources?: boolean;
  @ApiProperty()
  itemsPerPage?: number;
  @ApiProperty()
  page?: number;
}

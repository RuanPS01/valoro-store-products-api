import { ApiProperty } from '@nestjs/swagger';

export class IsRegisterPresenter {
  @ApiProperty()
  category: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  promotionPercent: number;
  @ApiProperty()
  spotPrice: number;
  @ApiProperty()
  forwardPrice: number;
  @ApiProperty()
  maxInstallmentsInterestFree: number;
  @ApiProperty()
  collectionName: string;
  @ApiProperty()
  origin: string;
  @ApiProperty()
  resources?: string;
  @ApiProperty()
  image: string;
}

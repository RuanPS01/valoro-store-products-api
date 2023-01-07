import { Optional } from '@nestjs/common';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ListDto {
  // @ApiProperty({ required: false })
  @Optional()
  // @IsString()
  readonly category?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsString()
  readonly name?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsBoolean()
  readonly inPromotion?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly promotionPercentMin?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly spotPriceMax?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly spotPriceMin?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly forwardPriceMax?: string;

  // @ApiProperty({ required: false })
  // @Optional()
  // @IsNumber()
  readonly forwardPriceMin?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly maxInstallmentsInterestFreeMin?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly sellerUserId?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsString()
  readonly sellerUserEmail?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsString()
  readonly collectionName?: string;

  // @ApiProperty({ required: false })
  // @Optional()
  // @IsString()
  readonly origin?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsBoolean()
  readonly haveResources?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly itemsPerPage?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly page?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly order?: string;

  // @ApiProperty({ required: false })
  @Optional()
  // @IsNumber()
  readonly referenceOrder?: string;
}

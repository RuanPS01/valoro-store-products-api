import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ListDto {
  @ApiProperty({ required: false })
  @Optional()
  @IsString()
  readonly category?: string;

  @ApiProperty({ required: false })
  @Optional()
  @IsBoolean()
  readonly inPromotion?: boolean;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly promotionPercentMin?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly spotPriceMax?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly spotPriceMin?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly forwardPriceMax?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly forwardPriceMin?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly maxInstallmentsInterestFreeMin?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsString()
  readonly collectionName?: string;

  @ApiProperty({ required: false })
  @Optional()
  @IsString()
  readonly origin?: string;

  @ApiProperty({ required: false })
  @Optional()
  @IsBoolean()
  readonly haveResources?: boolean;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly itemsPerPage?: number;

  @ApiProperty({ required: false })
  @Optional()
  @IsNumber()
  readonly page?: number;
}

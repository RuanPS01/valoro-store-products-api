import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly promotionPercent: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly spotPrice: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly forwardPrice: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly maxInstallmentsInterestFree: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly collectionName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly origin: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly resources?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

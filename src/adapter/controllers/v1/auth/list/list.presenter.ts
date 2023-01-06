import { ApiProperty } from '@nestjs/swagger';

export class IsListPresenter {
  @ApiProperty()
  email: string;
}

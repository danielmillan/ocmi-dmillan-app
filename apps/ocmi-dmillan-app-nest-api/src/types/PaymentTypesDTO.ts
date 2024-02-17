import { ApiProperty } from '@nestjs/swagger';

export class PaymentTypesDto {
  @ApiProperty({ description: 'Payment need units option' })
  needUnits: number;

  @ApiProperty({ description: 'Payment Label Units' })
  labelUnits: string;

  @ApiProperty({ description: 'Payment Value' })
  value: string;
}

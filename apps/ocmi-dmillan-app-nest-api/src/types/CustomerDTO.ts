import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'Customer name' })
  name: string;

  @ApiProperty({ description: 'Customer Phone' })
  phone: string;

  @ApiProperty({ description: 'Customer Address' })
  address: string;
}

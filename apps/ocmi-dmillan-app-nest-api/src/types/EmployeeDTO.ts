import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
  @ApiProperty({ description: 'Id from Customer' })
  customerId: number;

  @ApiProperty({ description: 'Employee name' })
  name: string;

  @ApiProperty({ description: 'Employee last Name' })
  lastName: string;

  @ApiProperty({ description: 'Employee Payment Type' })
  paymentType: number;

  @ApiProperty({ description: 'Employee Payment Amount' })
  paymentAmount: BigInt;
}

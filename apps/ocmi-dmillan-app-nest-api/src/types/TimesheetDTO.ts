import { ApiProperty } from '@nestjs/swagger';

export class TimesheetDto {
  @ApiProperty({ description: 'Customer Id To Timesheet' })
  customerId: number;

  @ApiProperty({ description: 'Timesheet Pay Period Start' })
  payPeriodStart: Date;

  @ApiProperty({ description: 'Timesheet Pay Period End' })
  payPeriodEnd: Date;

  @ApiProperty({ description: 'Timesheet Check Validity' })
  checkDate: Date;

  @ApiProperty({ description: 'Timesheet Check Number' })
  checkNumber: bigint;

  @ApiProperty({ description: 'Timesheet Gross Payroll' })
  grossPayroll: bigint;

  @ApiProperty({ description: 'Timesheet Remarks' })
  remarks?: string;

  @ApiProperty({ description: 'Timesheet Status' })
  status: string;
}

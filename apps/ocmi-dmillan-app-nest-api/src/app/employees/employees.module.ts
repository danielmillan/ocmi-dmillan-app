import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { DataAccessEmployeesModule } from '@ocmi-dmillan-app/data-access-employees';
@Module({
  imports: [DataAccessEmployeesModule],
  controllers: [EmployeesController],
})
export class EmployeesModule {}

import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class DataAccessEmployeesModule {}

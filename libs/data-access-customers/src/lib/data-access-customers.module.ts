import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class DataAccessCustomersModule {}

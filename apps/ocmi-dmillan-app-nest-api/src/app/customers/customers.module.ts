import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { DataAccessCustomersModule } from '@ocmi-dmillan-app/data-access-customers';

@Module({
  imports: [DataAccessCustomersModule],
  controllers: [CustomersController],
})
export class CustomersModule {}

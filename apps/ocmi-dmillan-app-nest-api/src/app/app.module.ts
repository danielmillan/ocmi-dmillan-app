import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ModulesModule,
    UsersModule,
    CustomersModule,
    EmployeesModule,
    TimesheetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

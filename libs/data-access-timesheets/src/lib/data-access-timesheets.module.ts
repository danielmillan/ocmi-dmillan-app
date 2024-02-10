import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [TimesheetsService],
  exports: [TimesheetsService],
})
export class DataAccessTimesheetsModule {}

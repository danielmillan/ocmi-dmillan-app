import { Module } from '@nestjs/common';
import { TimesheetsController } from './timesheets.controller';
import { DataAccessTimesheetsModule } from '@ocmi-dmillan-app/data-access-timesheets';

@Module({
  imports: [DataAccessTimesheetsModule],
  controllers: [TimesheetsController],
})
export class TimesheetsModule {}

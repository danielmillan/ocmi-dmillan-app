import { Module } from '@nestjs/common';
import { TimesheetsController } from './timesheets.controller';

@Module({
  controllers: [TimesheetsController],
})
export class TimesheetsModule {}

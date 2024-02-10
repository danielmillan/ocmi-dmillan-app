import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [LogsService],
  exports: [LogsService],
})
export class DataAccessLogsModule {}

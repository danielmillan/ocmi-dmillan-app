import { Module } from '@nestjs/common';
import { PrismaService } from './ocmi-dmillan-prisma-client.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class OcmiDmillanPrismaClientModule {}

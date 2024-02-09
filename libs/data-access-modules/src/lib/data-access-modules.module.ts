import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class DataAccessModulesModule {}

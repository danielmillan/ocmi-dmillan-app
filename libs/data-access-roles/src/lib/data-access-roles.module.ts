import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [RolesService],
  exports: [RolesService],
})
export class DataAccessRolesModule {}

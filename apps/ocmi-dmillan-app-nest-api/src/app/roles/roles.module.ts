import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { DataAccessRolesModule } from '@ocmi-dmillan-app/data-access-roles';

@Module({
  imports: [DataAccessRolesModule],
  controllers: [RolesController],
})
export class RolesModule {}

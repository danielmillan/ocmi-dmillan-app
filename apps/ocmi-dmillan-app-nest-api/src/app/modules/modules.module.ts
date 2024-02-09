import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { DataAccessModulesModule } from '@ocmi-dmillan-app/data-access-modules';

@Module({
  imports: [DataAccessModulesModule],
  controllers: [ModulesController],
  providers: [],
})
export class ModulesModule {}

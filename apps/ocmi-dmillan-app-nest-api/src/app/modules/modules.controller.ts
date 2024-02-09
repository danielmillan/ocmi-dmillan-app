import { Controller, Get } from '@nestjs/common';
import { ModulesService } from '@ocmi-dmillan-app/data-access-modules';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  async getModules() {
    return this.modulesService.modules({ where: { isActive: true } });
  }
}

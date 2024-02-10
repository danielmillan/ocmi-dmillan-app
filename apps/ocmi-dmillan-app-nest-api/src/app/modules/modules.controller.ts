import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ModulesService } from '@ocmi-dmillan-app/data-access-modules';
import { IActionsModules } from '@ocmi-dmillan-app/ocmi-dmillan-types';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';
import { ModuleDto } from '../../types/ModuleDTO';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('modules')
@ApiTags('Modules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  @ApiOkResponse({
    description: 'The user has been successfully created.',
    type: [ModuleDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getModules() {
    try {
      return this.modulesService.getModules({ where: { isActive: true } });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code ? error.code : error,
          message: error.message ? error.message : error,
        },
      });
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Module successfully found.',
    type: ModuleDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getModule(@Param('id') id: String) {
    try {
      return this.modulesService.getModule({ id: Number(id) });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code ? error.code : error,
          message: error.message ? error.message : error,
        },
      });
    }
  }

  @Put(':id/actions')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Actions from modules updated successfully.',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async deleteModulesFromRole(
    @Param('id') id: String,
    @Body() data: IActionsModules[]
  ) {
    try {
      return this.modulesService.manageModulesForRole({
        roleId: Number(id),
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code ? error.code : error,
          message: error.message ? error.message : error,
        },
      });
    }
  }
}

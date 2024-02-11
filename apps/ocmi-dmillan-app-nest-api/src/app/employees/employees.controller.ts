import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  InternalServerErrorException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmployeesService } from '@ocmi-dmillan-app/data-access-employees';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { EmployeeDto } from '../../types/EmployeeDTO';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';

@Controller('employees')
@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiBody({ type: EmployeeDto })
  @ApiOkResponse({
    description: 'The employee has been successfully created.',
    type: EmployeeDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async createEmployee(
    @Body() employee: Prisma.EmployeesCreateInput
  ): Promise<EmployeeDto> {
    try {
      return this.employeesService.createEmployee(employee);
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

  @Get()
  @ApiOkResponse({
    description: 'List returned correctly.',
    type: [EmployeeDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getEmployees() {
    try {
      return this.employeesService.getEmployees({});
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
    description: 'Employee successfully found.',
    type: EmployeeDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getEmployee(@Param('id') id: string) {
    try {
      return this.employeesService.getEmployee({ where: { id: Number(id) } });
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

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: EmployeeDto })
  @ApiOkResponse({
    description: 'The employee has been successfully updated.',
    type: EmployeeDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async updateEmployee(
    @Body() data: Prisma.EmployeesUpdateInput,
    @Param('id') id: String
  ) {
    try {
      return this.employeesService.updateEmployee({
        where: {
          id: Number(id),
        },
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

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'The employee has been successfully deleted.',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async deleteEmployee(@Param('id') id: String) {
    try {
      return this.employeesService.deleteEmployee({ id: Number(id) });
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

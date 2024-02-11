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
import { TimesheetsService } from '@ocmi-dmillan-app/data-access-timesheets';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { TimesheetDto } from '../../types/TimesheetDTO';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';

@Controller('timesheets')
@ApiTags('Timesheets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Post()
  @ApiBody({ type: TimesheetDto })
  @ApiOkResponse({
    description: 'The timesheet has been successfully created.',
    type: TimesheetDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async createTimesheet(
    @Body() timesheet: Prisma.TimesheetsCreateInput
  ): Promise<TimesheetDto> {
    try {
      return this.timesheetsService.createTimesheet(timesheet);
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
    type: [TimesheetDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getTimesheets() {
    try {
      return this.timesheetsService.getTimesheets({});
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
    description: 'Timesheet successfully found.',
    type: TimesheetDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getTimesheet(@Param('id') id: string) {
    try {
      return this.timesheetsService.getTimesheet({ where: { id: Number(id) } });
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
  @ApiBody({ type: TimesheetDto })
  @ApiOkResponse({
    description: 'The timesheet has been successfully updated.',
    type: TimesheetDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async updateTimesheet(
    @Body() data: Prisma.TimesheetsUpdateInput,
    @Param('id') id: String
  ) {
    try {
      return this.timesheetsService.updateTimesheet({
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
    description: 'The timesheet has been successfully deleted.',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async deleteTimesheet(@Param('id') id: String) {
    try {
      return this.timesheetsService.deleteTimesheet({ id: Number(id) });
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

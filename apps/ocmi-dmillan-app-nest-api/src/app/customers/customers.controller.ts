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
import { CustomersService } from '@ocmi-dmillan-app/data-access-customers';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { CustomerDto } from '../../types/CustomerDTO';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';

@Controller('customers')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiBody({ type: CustomerDto })
  @ApiOkResponse({
    description: 'The customer has been successfully created.',
    type: CustomerDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async createCustomer(
    @Body() customer: Prisma.CustomersCreateInput
  ): Promise<CustomerDto> {
    try {
      return this.customersService.createCustomer(customer);
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
    type: [CustomerDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getCustomers() {
    try {
      return this.customersService.getCustomers({});
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
    description: 'Customer successfully found.',
    type: CustomerDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getCustomer(@Param('id') id: string) {
    try {
      return this.customersService.getCustomer({ where: { id: Number(id) } });
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
  @ApiBody({ type: CustomerDto })
  @ApiOkResponse({
    description: 'The customer has been successfully updated.',
    type: CustomerDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async updateCustomer(
    @Body() data: Prisma.CustomersUpdateInput,
    @Param('id') id: String
  ) {
    try {
      return this.customersService.updateCustomer({
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
    description: 'The customer has been successfully deleted.',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async deleteCustomer(@Param('id') id: String) {
    try {
      return this.customersService.deleteCustomer({ id: Number(id) });
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

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
import { UsersService } from '@ocmi-dmillan-app/data-access-users';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { UserDto } from '../../types/UserDTO';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserDto })
  @ApiOkResponse({
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async createUser(@Body() user: Prisma.UsersCreateInput): Promise<UserDto> {
    try {
      return this.usersService.createUser(user);
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
    type: [UserDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getUsers() {
    try {
      return this.usersService.getUsers({
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
          isActive: true,
          lastLogin: true,
        },
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

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'User successfully found.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async getUser(@Param('id') id: string) {
    try {
      return this.usersService.getUser({ where: { id: Number(id) } });
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
  @ApiBody({ type: UserDto })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async updateUser(
    @Body() data: Prisma.UsersUpdateInput,
    @Param('id') id: String
  ) {
    try {
      return this.usersService.updateUser({
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
    description: 'The user has been successfully deleted.',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  async deleteUser(@Param('id') id: String) {
    try {
      return this.usersService.deleteUser({ id: Number(id) });
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

import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Users } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from '../../types/Responses/AuthResponse';
import { UserDto } from '../../types/UserDTO';
import { UnauthorizedResponse } from '../../types/Responses/Unauthorized';
import { AuthDto } from '../../types/AuthDTO';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: AuthDto })
  @ApiOkResponse({
    description: 'User authenticated.',
    type: AuthResponse,
  })
  async login(@Request() req): Promise<{ token: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User authenticated.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized resource.',
    type: UnauthorizedResponse,
  })
  @ApiBearerAuth()
  async validate(@Request() req): Promise<Users> {
    return req.user;
  }
}

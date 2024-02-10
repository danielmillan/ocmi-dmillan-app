import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Users } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: Users) {
    return {
      userInfo: {
        id: payload.id,
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        roleId: payload.roleId,
      },
    };
  }
}

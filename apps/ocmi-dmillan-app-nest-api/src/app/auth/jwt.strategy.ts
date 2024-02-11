import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RolesService } from '@ocmi-dmillan-app/data-access-roles';
import { UserResponse } from '../../types/Responses/UserResponse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly rolesService: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: UserResponse) {
    const loadPermissions = await this.rolesService.loadActionsFromRole(
      payload.role.id
    );
    return {
      userInfo: {
        id: payload.id,
        customer: payload.customer,
        role: payload.role,
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        isActive: payload.isActive,
      },
      permissions: loadPermissions,
    };
  }
}

import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@ocmi-dmillan-app/data-access-users';
import { EScopesApp, IAuthResponse } from '../../types/Responses/AuthResponse';
import { Prisma, Users } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async findByEmail(email: string): Promise<Users | null> {
    try {
      return await this.usersService.getUser({
        where: { email },
        select: {
          id: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          role: {
            select: {
              id: true,
              name: true,
            },
          },
          name: true,
          lastName: true,
          email: true,
          password: true,
          isActive: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateUser(email: string, pass: string): Promise<Users | null> {
    const user: Users = await this.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      this.usersService.updateUser({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });
      const payload = user;
      delete payload.password;
      return payload;
    }
    return null;
  }

  async login(user: Prisma.UsersSelect): Promise<IAuthResponse> {
    const payload = {
      id: user.id,
      customer: user.customer,
      role: user.role,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    };
    return {
      token: this.jwtService.sign(payload),
      scope: user.customer ? EScopesApp.CUSTOMER : EScopesApp.OPERATION,
    };
  }
}

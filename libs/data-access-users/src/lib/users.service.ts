import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput) {
    try {
      data.password = await this.hashPassword(data.password);
      return await this.prismaService.users.create({ data });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUsers(
    options: IGetOptionsEntities<
      Prisma.UsersWhereUniqueInput,
      Prisma.UsersWhereInput,
      Prisma.UsersOrderByWithRelationInput
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy } = options;
      return await this.prismaService.users.findMany({
        skip,
        take,
        where,
        cursor,
        orderBy,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUser(options: {
    where: Prisma.UsersWhereUniqueInput;
    select?: Prisma.UsersSelect;
  }) {
    try {
      const { where, select } = options;
      return await this.prismaService.users.findUnique({
        where,
        select,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUser(options: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    try {
      const { data, where } = options;
      return await this.prismaService.users.update({ data, where });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(userWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    try {
      await this.prismaService.users.delete({
        where: userWhereUniqueInput,
      });
      return 'User has been successfully deleted.';
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  };
}

import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async createRole(data: Prisma.RolesCreateInput) {
    try {
      return await this.prismaService.roles.create({ data });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getRoles(
    options: IGetOptionsEntities<
      Prisma.RolesWhereUniqueInput,
      Prisma.RolesWhereInput,
      Prisma.RolesOrderByWithRelationInput,
      Prisma.RolesSelect
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy, select } = options;
      return await this.prismaService.roles.findMany({
        skip,
        take,
        where,
        cursor,
        orderBy,
        select,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getRole(roleWhereUniqueInput: Prisma.RolesWhereUniqueInput) {
    try {
      return await this.prismaService.roles.findUnique({
        where: roleWhereUniqueInput,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async loadActionsFromRole(id: number) {
    try {
      return await this.prismaService.roles
        .findUnique({
          where: { id },
          select: {
            Modules_Per_Role: {
              select: {
                module: {
                  select: {
                    name: true,
                  },
                },
                action: true,
              },
            },
          },
        })
        .then((actions) =>
          actions?.Modules_Per_Role.map(
            (action) => `${action.module.name}:${action.action}`
          )
        );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateRole(options: {
    where: Prisma.RolesWhereUniqueInput;
    data: Prisma.RolesUpdateInput;
  }) {
    try {
      const { data, where } = options;
      return await this.prismaService.roles.update({ data, where });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteRole(roleWhereUniqueInput: Prisma.RolesWhereUniqueInput) {
    try {
      return await this.prismaService.roles.delete({
        where: roleWhereUniqueInput,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';
import { IActionsModules } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class ModulesService {
  constructor(private prismaService: PrismaService) {}

  async getModules(
    options: IGetOptionsEntities<
      Prisma.ModulesWhereUniqueInput,
      Prisma.ModulesWhereInput,
      Prisma.ModulesOrderByWithRelationInput
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy } = options;
      return await this.prismaService.modules.findMany({
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

  async manageModulesForRole(options: {
    roleId: number;
    data: IActionsModules[];
  }) {
    try {
      const { roleId, data } = options;
      const currentModules = await this.prismaService.modules_Per_Role.findMany(
        {
          where: {
            roleId,
          },
          select: {
            moduleId: true,
            action: true,
          },
        }
      );
      const modulesToDelete = currentModules.filter(
        (item) =>
          !data.find(
            (record) =>
              record.moduleId === item.moduleId && record.action === item.action
          )
      );
      const modulesToAdd = data.filter(
        (item) =>
          !currentModules.find(
            (record) =>
              record.moduleId === record.moduleId &&
              record.action === item.action
          )
      );
      await this.prismaService.modules_Per_Role.deleteMany({
        where: {
          roleId,
          moduleId: {
            in: modulesToDelete.map((action) => action.moduleId),
          },
          action: {
            in: modulesToDelete.map((action) => action.action),
          },
        },
      });
      await this.prismaService.modules_Per_Role.createMany({
        data: modulesToAdd.map((newAction) => ({
          roleId: roleId,
          moduleId: newAction.moduleId,
          action: newAction.action,
        })),
      });
      return 'Modules Updated';
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getModule(moduleWhereUniqueInput: Prisma.ModulesWhereUniqueInput) {
    try {
      return await this.prismaService.modules.findUnique({
        where: moduleWhereUniqueInput,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Injectable()
export class ModulesService {
  constructor(private prismaService: PrismaService) {}

  async modules(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ModulesWhereUniqueInput;
    where?: Prisma.ModulesWhereInput;
    orderBy?: Prisma.ModulesOrderByWithRelationInput;
  }) {
    const { skip, take, where, cursor, orderBy } = options;
    return this.prismaService.modules.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy,
    });
  }

  async createModule(data: Prisma.ModulesCreateInput) {
    return this.prismaService.modules.create({ data });
  }
}

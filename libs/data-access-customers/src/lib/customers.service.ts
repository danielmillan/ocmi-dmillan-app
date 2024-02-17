import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async createCustomer(data: Prisma.CustomersCreateInput) {
    try {
      return await this.prismaService.customers.create({ data });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCustomers(
    options: IGetOptionsEntities<
      Prisma.CustomersWhereUniqueInput,
      Prisma.CustomersWhereInput,
      Prisma.CustomersOrderByWithRelationInput,
      Prisma.CustomersSelect
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy, select } = options;
      return await this.prismaService.customers.findMany({
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

  async getCustomer(options: {
    where: Prisma.CustomersWhereUniqueInput;
    select?: Prisma.CustomersSelect;
  }) {
    try {
      const { where, select } = options;
      return await this.prismaService.customers.findUnique({
        where,
        select,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCustomer(options: {
    where: Prisma.CustomersWhereUniqueInput;
    data: Prisma.CustomersUpdateInput;
  }) {
    try {
      const { data, where } = options;
      return await this.prismaService.customers.update({ data, where });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteCustomer(
    customerWhereUniqueInput: Prisma.CustomersWhereUniqueInput
  ) {
    try {
      await this.prismaService.customers.delete({
        where: customerWhereUniqueInput,
      });
      return 'Customer has been successfully deleted.';
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

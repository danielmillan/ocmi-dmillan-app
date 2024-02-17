import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}

  async createEmployee(data: Prisma.EmployeesCreateInput) {
    try {
      return await this.prismaService.employees.create({ data });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getEmployees(
    options: IGetOptionsEntities<
      Prisma.EmployeesWhereUniqueInput,
      Prisma.EmployeesWhereInput,
      Prisma.EmployeesOrderByWithRelationInput,
      Prisma.EmployeesSelect
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy, select } = options;
      return await this.prismaService.employees.findMany({
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

  async getPaymentTypes() {
    try {
      return await this.prismaService.payment_Types.findMany();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getEmployee(options: {
    where: Prisma.EmployeesWhereUniqueInput;
    select?: Prisma.EmployeesSelect;
  }) {
    try {
      const { where, select } = options;
      return await this.prismaService.employees.findUnique({
        where,
        select,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateEmployee(options: {
    where: Prisma.EmployeesWhereUniqueInput;
    data: Prisma.EmployeesUpdateInput;
  }) {
    try {
      const { data, where } = options;
      return await this.prismaService.employees.update({ data, where });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteEmployee(
    employeeWhereUniqueInput: Prisma.EmployeesWhereUniqueInput
  ) {
    try {
      await this.prismaService.employees.delete({
        where: employeeWhereUniqueInput,
      });
      return 'Employee has been successfully deleted.';
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { IGetOptionsEntities } from '@ocmi-dmillan-app/ocmi-dmillan-types';

@Injectable()
export class TimesheetsService {
  constructor(private prismaService: PrismaService) {}

  async createTimesheet(data: Prisma.TimesheetsCreateInput) {
    try {
      return await this.prismaService.timesheets.create({ data });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getTimesheets(
    options: IGetOptionsEntities<
      Prisma.TimesheetsWhereUniqueInput,
      Prisma.TimesheetsWhereInput,
      Prisma.TimesheetsOrderByWithRelationInput
    >
  ) {
    try {
      const { skip, take, where, cursor, orderBy } = options;
      return await this.prismaService.timesheets.findMany({
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

  async getTimesheet(options: {
    where: Prisma.TimesheetsWhereUniqueInput;
    select?: Prisma.TimesheetsSelect;
  }) {
    try {
      const { where, select } = options;
      return await this.prismaService.timesheets.findUnique({
        where,
        select,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateTimesheet(options: {
    where: Prisma.TimesheetsWhereUniqueInput;
    data: Prisma.TimesheetsUpdateInput;
  }) {
    try {
      const { data, where } = options;
      return await this.prismaService.timesheets.update({ data, where });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteTimesheet(
    timesheetWhereUniqueInput: Prisma.TimesheetsWhereUniqueInput
  ) {
    try {
      await this.prismaService.timesheets.delete({
        where: timesheetWhereUniqueInput,
      });
      return 'Timesheet has been successfully deleted.';
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

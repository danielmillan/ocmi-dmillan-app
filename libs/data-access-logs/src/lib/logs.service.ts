import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Injectable()
export class LogsService {
  constructor(private prismaService: PrismaService) {}
}

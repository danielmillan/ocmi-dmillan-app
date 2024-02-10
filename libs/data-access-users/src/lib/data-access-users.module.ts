import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OcmiDmillanPrismaClientModule } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

@Module({
  imports: [OcmiDmillanPrismaClientModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class DataAccessUsersModule {}

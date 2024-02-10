import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DataAccessUsersModule } from '@ocmi-dmillan-app/data-access-users';

@Module({
  imports: [DataAccessUsersModule],
  controllers: [UsersController],
})
export class UsersModule {}

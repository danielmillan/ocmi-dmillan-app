import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Id from Role' })
  roleId: number;

  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'User last Name' })
  lastName: string;

  @ApiProperty({ description: 'User Email' })
  email: string;

  @ApiProperty({ description: 'User Password' })
  password: string;
}

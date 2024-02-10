import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: 'User name' })
  name: string;
}

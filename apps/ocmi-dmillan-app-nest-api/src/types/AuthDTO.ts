import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'Module name', example: 'jhon@doe.com' })
  email: string;

  @ApiProperty({ description: 'Module label', example: 'MyPassword' })
  password: string;
}

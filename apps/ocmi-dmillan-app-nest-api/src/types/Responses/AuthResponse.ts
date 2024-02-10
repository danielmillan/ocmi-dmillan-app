import { ApiProperty } from '@nestjs/swagger';

export interface IAuthResponse {
  token: string;
}

export class AuthResponse {
  @ApiProperty()
  token: string;
}

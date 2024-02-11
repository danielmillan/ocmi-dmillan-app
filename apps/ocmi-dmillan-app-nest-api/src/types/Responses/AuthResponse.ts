import { ApiProperty } from '@nestjs/swagger';

export enum EScopesApp {
  CUSTOMER = 'CUSTOMER',
  OPERATION = 'OPERATION',
}

export interface IAuthResponse {
  token: string;
  scope: EScopesApp;
}

export class AuthResponse {
  @ApiProperty()
  token: string;
}

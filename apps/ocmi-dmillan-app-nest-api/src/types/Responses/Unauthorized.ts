import { ApiProperty } from '@nestjs/swagger';

class ErrorResponse {
  @ApiProperty()
  message: string;
}

export class UnauthorizedResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  error: ErrorResponse;
}

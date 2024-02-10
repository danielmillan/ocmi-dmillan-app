import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto {
  @ApiProperty({ description: 'Module name' })
  name: string;

  @ApiProperty({ description: 'Module label' })
  label: string;
}

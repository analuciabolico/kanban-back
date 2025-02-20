import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ZodObject, z } from 'zod';

export class PrincipalDto {
  @ApiProperty({
    description: 'The sub',
    default: '1',
  })
  @IsInt()
  @IsNotEmpty()
  readonly sub: number;

  @ApiProperty({
    description: 'The username',
    default: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The iat',
    default: '1694526113',
  })
  @IsInt()
  @IsNotEmpty()
  readonly iat: number;

  @ApiProperty({
    description: 'The exp',
    default: '1694526413',
  })
  @IsInt()
  @IsNotEmpty()
  readonly exp: number;

  constructor(partial: Partial<PrincipalDto>) {
    Object.assign(this, partial);
  }

  static schemaValidation(): ZodObject<any> {
    return z
      .object({
        sub: z.number(),
        username: z.string(),
        iat: z.number(),
        exp: z.number(),
      })
      .required()
      .strict();
  }
}

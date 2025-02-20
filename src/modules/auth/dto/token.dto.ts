import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ZodObject, z } from 'zod';

export class TokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly access_token: string;

  constructor(partial: Partial<TokenDto>) {
    Object.assign(this, partial);
  }

  static schemaValidation(): ZodObject<any> {
    return z
      .object({
        access_token: z.string(),
      })
      .required()
      .strict();
  }
}

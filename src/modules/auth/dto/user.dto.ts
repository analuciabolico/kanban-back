import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ZodObject, z } from 'zod';

export class UserDto {
  @ApiProperty({
    description: 'The username',
    default: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password',
    default: '*****',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  static schemaValidation(): ZodObject<any> {
    return z
      .object({
        username: z.string(),
        password: z.string(),
      })
      .required()
      .strict();
  }
}

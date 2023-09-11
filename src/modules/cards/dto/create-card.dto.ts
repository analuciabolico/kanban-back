import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Card } from 'src/core/domain/entities/card.entity';
import { ZodObject, z } from 'zod';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  readonly titulo: string;

  @ApiProperty()
  @IsString()
  readonly conteudo: string;

  @ApiProperty()
  @IsString()
  readonly lista: string;

  constructor(partial: Partial<CreateCardDto>) {
    Object.assign(this, partial);
  }

  static toEntity(dto: CreateCardDto): Card {
    return new Card({
      id: undefined,
      title: dto.titulo,
      content: dto.conteudo,
      list: dto.lista,
    });
  }

  static schemaValidation(): ZodObject<any> {
    return z
      .object({
        titulo: z.string({
          required_error: 'Propriedade "titulo" e obrigatoria',
        }),
        conteudo: z.string(),
        lista: z.string(),
      })
      .required()
      .strict();
  }
}

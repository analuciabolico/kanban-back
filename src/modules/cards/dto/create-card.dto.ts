import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Card } from 'src/core/domain/entities/card.entity';
import { ZodObject, z } from 'zod';

export class CreateCardDto {
  @ApiProperty({
    description: 'The titulo property',
    default: 'Example title',
  })
  @IsString()
  readonly titulo: string;

  @ApiProperty({
    description: 'The conteudo property',
    default: 'Example conteudo',
  })
  @IsString()
  readonly conteudo: string;

  @ApiProperty({
    description: 'The lista property',
    default: 'Example lista',
  })
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

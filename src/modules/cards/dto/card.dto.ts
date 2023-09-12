import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Card } from 'src/core/domain/entities/card.entity';
import { ZodObject, z } from 'zod';

export class CardDto {
  @ApiProperty({
    description: 'The id property',
    default: '1',
  })
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({
    description: 'The titulo property',
    default: 'Example title',
  })
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @ApiProperty({
    description: 'The conteudo property',
    default: 'Example conteudo',
  })
  @IsString()
  @IsNotEmpty()
  readonly conteudo: string;

  @ApiProperty({
    description: 'The lista property',
    default: 'Example lista',
  })
  @IsString()
  @IsNotEmpty()
  readonly lista: string;

  constructor(partial: Partial<CardDto>) {
    Object.assign(this, partial);
  }

  static toEntity(dto: CardDto): Card {
    return new Card({
      id: dto.id,
      title: dto.titulo,
      content: dto.conteudo,
      list: dto.lista,
    });
  }

  static fromEntity(entity: Card): CardDto {
    return new CardDto({
      id: entity.id,
      titulo: entity.title,
      conteudo: entity.content,
      lista: entity.list,
    });
  }

  static schemaValidation(): ZodObject<any> {
    return z
      .object({
        id: z.number(),
        titulo: z.string(),
        conteudo: z.string(),
        lista: z.string(),
      })
      .required()
      .strict();
  }
}

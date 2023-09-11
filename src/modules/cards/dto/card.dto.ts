import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Card } from 'src/core/domain/entities/card.entity';
import { ZodObject, z } from 'zod';

export class CardDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly conteudo: string;

  @ApiProperty()
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

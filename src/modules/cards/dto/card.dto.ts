import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/core/domain/entities/card.entity';

export class CardDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly titulo: string;
  @ApiProperty()
  readonly conteudo: string;
  @ApiProperty()
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
}

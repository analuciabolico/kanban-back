import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/core/domain/entities/card.entity';

export class CreateCardDto {
  @ApiProperty({ required: false })
  readonly id: number;
  @ApiProperty()
  readonly titulo: string;
  @ApiProperty()
  readonly conteudo: string;
  @ApiProperty()
  readonly lista: string;

  constructor(partial: Partial<CreateCardDto>) {
    Object.assign(this, partial);
  }

  static toEntity(dto: CreateCardDto): Card {
    return new Card({
      id: dto.id,
      title: dto.titulo,
      content: dto.conteudo,
      list: dto.lista,
    });
  }

  static fromEntity(entity: Card): CreateCardDto {
    return new CreateCardDto({
      id: entity.id,
      titulo: entity.title,
      conteudo: entity.content,
      lista: entity.list,
    });
  }
}

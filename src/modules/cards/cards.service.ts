import { Injectable, NotFoundException } from '@nestjs/common';
import { CardCoreService } from 'src/core/service/card-core/card-core.service';
import { CardDto } from './dto/card.dto';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardCoreService: CardCoreService) {}

  async findAll(): Promise<CardDto[]> {
    const response = await this.cardCoreService.findAll();

    return response.map((entity) => CardDto.fromEntity(entity));
  }

  async save(dto: CreateCardDto): Promise<CardDto> {
    const entity = CreateCardDto.toEntity(dto);
    const saved = await this.cardCoreService.save(entity);

    return CardDto.fromEntity(saved);
  }

  async findById(id: number): Promise<CardDto> {
    const entity = await this.cardCoreService.findOne(id);

    if (!entity) {
      throw new NotFoundException(`Recurso com o ID ${id} não encontrado.`);
    }

    return CardDto.fromEntity(entity);
  }

  async update(dto: CardDto): Promise<CardDto> {
    const saved = await this.cardCoreService.findOne(dto.id);

    if (!saved) {
      throw new NotFoundException(`Recurso com o ID ${dto.id} não encontrado.`);
    }

    const entity = { ...saved, ...CardDto.toEntity(dto) };
    const updated = await this.cardCoreService.save(entity);

    return CardDto.fromEntity(updated);
  }

  async delete(id: number): Promise<void> {
    const saved = await this.cardCoreService.findOne(id);

    if (!saved) {
      throw new NotFoundException(`Recurso com o ID ${id} não encontrado.`);
    }

    await this.cardCoreService.remove(id);
  }
}

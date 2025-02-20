import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/core/domain/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardCoreService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async findOne(id: number): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }

  async save(card: Card): Promise<Card> {
    return this.cardRepository.save(card);
  }
}

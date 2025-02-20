import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/core/domain/entities/card.entity';
import { CardCoreService } from './card-core.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardCoreService],
  exports: [CardCoreService],
})
export class CardCoreModule {}

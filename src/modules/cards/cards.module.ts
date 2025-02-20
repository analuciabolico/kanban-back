import { Module } from '@nestjs/common';
import { CardCoreModule } from 'src/core/service/card-core/card-core.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [CardCoreModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

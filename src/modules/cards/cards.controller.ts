import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('cards')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({ description: 'Exemplo OK' })
  async findAll(): Promise<CreateCardDto[]> {
    return this.cardsService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Exemplo Created' })
  async save(@Body() body: CreateCardDto): Promise<CreateCardDto> {
    return this.cardsService.save(body);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Exemplo OK' })
  async findById(@Param('id') id: number): Promise<CreateCardDto> {
    return this.cardsService.findById(id);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Exemplo Created' })
  async update(@Body() body: CreateCardDto): Promise<CreateCardDto> {
    return this.cardsService.update(body);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Exemplo No Content' })
  async remove(@Param('id') id: number): Promise<void> {
    this.cardsService.delete(id);
  }
}

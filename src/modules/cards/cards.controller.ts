import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('cards')
@ApiBearerAuth()
@ApiHeader({
  name: 'X-API-Version',
  description: 'Version header',
  allowEmptyValue: true,
  example: '1',
})
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller({
  path: 'cards',
  version: VERSION_NEUTRAL,
})
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({ description: 'Exemplo OK', type: [CardDto] })
  async findAll(): Promise<CardDto[]> {
    return await this.cardsService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Exemplo Created', type: CardDto })
  @UsePipes(new ZodValidationPipe(CreateCardDto.schemaValidation()))
  async save(@Body() body: CreateCardDto): Promise<CardDto> {
    return await this.cardsService.save(body);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Exemplo OK', type: CardDto })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<CardDto> {
    return this.cardsService.findById(id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Exemplo OK', type: [CardDto] })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CardDto[]> {
    await this.cardsService.delete(id);
    return await this.cardsService.findAll();
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Exemplo Updated', type: CardDto })
  @ApiBadRequestResponse({ description: 'Exemplo Bad Request' })
  @UsePipes(new ZodValidationPipe(CardDto.schemaValidation()))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CardDto,
  ): Promise<CardDto> {
    if (id != body.id) {
      throw new BadRequestException(
        'IDs do parametro e do corpo da requisicao sao diferentes',
      );
    }

    return await this.cardsService.update(body);
  }
}

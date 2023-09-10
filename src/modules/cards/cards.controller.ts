import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
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
    return await this.cardsService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Exemplo Created' })
  async save(@Body() body: CreateCardDto): Promise<CreateCardDto> {
    return await this.cardsService.save(body);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Exemplo OK' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateCardDto> {
    return this.cardsService.findById(id);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Exemplo No Content' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cardsService.delete(id);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Exemplo Created' })
  @ApiBadRequestResponse({ description: 'Exemplo Bad Request' })
  async update(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateCardDto,
  ) {
    if (id === body.id) {
      const card = await this.cardsService.update(body);

      response.status(HttpStatus.OK).send(card);
    } else {
      response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CardCoreService } from 'src/core/service/card-core/card-core.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

describe('CardsService', () => {
  let service: CardsService;
  let coreService: CardCoreService;

  const dto: CreateCardDto = {
    titulo: 'Whiskers',
    conteudo: 'Livro',
    lista: 'Todo',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardCoreService,
          useValue: {
            findAll: jest.fn().mockReturnValue([]),
            findOne: jest.fn().mockReturnValue(undefined),
            save: jest.fn().mockReturnValue(dto),
            remove: jest.fn().mockReturnValue(() => {}),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    coreService = module.get<CardCoreService>(CardCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const expectedResult = [dto];
      const result = await service.save(dto);

      expect(result).toEqual(expectedResult);
    });
  });
});

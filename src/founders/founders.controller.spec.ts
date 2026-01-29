import { Test, TestingModule } from '@nestjs/testing';
import { FoundersController } from './founders.controller';
import { FoundersService } from './founders.service';

describe('FoundersController', () => {
  let controller: FoundersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoundersController],
      providers: [FoundersService],
    }).compile();

    controller = module.get<FoundersController>(FoundersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

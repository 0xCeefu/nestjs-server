import { Test, TestingModule } from '@nestjs/testing';
import { FoundersService } from './founders.service';

describe('FoundersService', () => {
  let service: FoundersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoundersService],
    }).compile();

    service = module.get<FoundersService>(FoundersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

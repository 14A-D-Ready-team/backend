import { Test, TestingModule } from '@nestjs/testing';
import { BuffetService } from './buffet.service';

describe('BuffetService', () => {
  let service: BuffetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuffetService],
    }).compile();

    service = module.get<BuffetService>(BuffetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BuffetController } from './buffet.controller';

describe('BuffetController', () => {
  let controller: BuffetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuffetController],
    }).compile();

    controller = module.get<BuffetController>(BuffetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

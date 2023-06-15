import { Test, TestingModule } from '@nestjs/testing';
import { Postagem } from './postagem';

describe('Postagem', () => {
  let provider: Postagem;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Postagem],
    }).compile();

    provider = module.get<Postagem>(Postagem);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

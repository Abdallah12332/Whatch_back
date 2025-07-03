import { Test, TestingModule } from '@nestjs/testing';
import { ProductUserResolver } from './product-user.resolver';

describe('ProductUserResolver', () => {
  let resolver: ProductUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductUserResolver],
    }).compile();

    resolver = module.get<ProductUserResolver>(ProductUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

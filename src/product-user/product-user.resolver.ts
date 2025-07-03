import { Args, Resolver } from '@nestjs/graphql';
import { ProductUserService } from './product-user.service';
import { Query } from '@nestjs/graphql';
import { Product } from 'src/Entities/Product.entity';

@Resolver()
export class ProductUserResolver {
  constructor(private readonly Product_user: ProductUserService) {}

  @Query(() => [Product])
  async search_products(@Args('name') name: string): Promise<Product[]> {
    return await this.Product_user.search_products(name);
  }
}

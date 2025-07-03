import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from 'src/Entities/Product.entity';
import { Create_Product } from './DTO/Create_Product.dto';
import { Update_Product } from './DTO/Update_Product.dto';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user/user.guard';

@UseGuards(UserGuard)
@Resolver()
export class ProductResolver {
  constructor(private readonly ProductService: ProductService) {}

  @Query(() => [Product])
  async findAllProducts() {
    return await this.ProductService.findAllProducts();
  }
  @Query(() => Product)
  async findOneProduct(@Args('id') id: number) {
    return await this.ProductService.findOneProduct(id);
  }
  @Mutation(() => Product)
  async createProduct(@Args('product') ProductDtoC: Create_Product) {
    return this.ProductService.createProduct(ProductDtoC);
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('product') ProductDtoU: Update_Product,
  ) {
    return this.ProductService.updateProduct(id, ProductDtoU);
  }
  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: number) {
    return this.ProductService.deleteProduct(id);
  }
}

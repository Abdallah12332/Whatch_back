import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { Repository } from 'typeorm';
import { Create_Product } from './DTO/Create_Product.dto';
import { Update_Product } from './DTO/Update_Product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async findAllProducts() {
    return await this.ProductRepo.find();
  }

  async findOneProduct(id: number) {
    const product = await this.ProductRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    }
    return product;
  }

  async createProduct(ProductDtoC: Create_Product): Promise<Product> {
    const newUser = this.ProductRepo.create(ProductDtoC);
    return this.ProductRepo.save(newUser);
  }

  async updateProduct(
    id: number,
    ProductDtoU: Update_Product,
  ): Promise<Product> {
    const Product = await this.ProductRepo.preload({ id: id, ...ProductDtoU });
    if (!Product) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.ProductRepo.save(Product);
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.ProductRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.ProductRepo.delete(product);
    return product;
  }
}

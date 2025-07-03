import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductUserService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}
  async search_products(name: string): Promise<Product[]> {
    const products = await this.ProductRepo.find({
      where: { name: Like(`%${name}%`) },
    });
    return products;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/Entities/cart.entity';
import { Product } from 'src/Entities/Product.entity';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(Cart) private readonly CartRepo: Repository<Cart>,
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async Create_Order(reel_username: string, id: number): Promise<string> {
    const user = await this.UserRepo.findOne({
      where: { reel_username },
    });
    if (!user) {
      throw new UnauthorizedException('the reel_username not found!');
    }
    const cart = await this.CartRepo.findOneBy({ reel_username });
    if (!cart) {
      throw new UnauthorizedException('the reel_username not found!');
    }
    const product = await this.ProductRepo.findOne({ where: { id } });
    if (!product) {
      throw new UnauthorizedException('Product not found');
    }
    const stringy_Porduct = JSON.stringify(product);

    await this.CartRepo.update(
      { reel_username: 'III' },
      { products: stringy_Porduct },
    );
    return stringy_Porduct;
  }
}

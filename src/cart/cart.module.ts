import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { Cart } from 'src/Entities/cart.entity';
import { Product } from 'src/Entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

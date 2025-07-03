import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cart_Service: CartService) {}
  @Post('Create_Order')
  async Create_Order(
    @Body() body: { reel_username: string; id: number },
  ): Promise<string> {
    const Product = await this.cart_Service.Create_Order(
      body.reel_username,
      body.id,
    );
    return Product;
  }
}

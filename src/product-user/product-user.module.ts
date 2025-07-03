import { Module } from '@nestjs/common';
import { ProductUserService } from './product-user.service';
import { ProductUserResolver } from './product-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductUserService, ProductUserResolver],
})
export class ProductUserModule {}

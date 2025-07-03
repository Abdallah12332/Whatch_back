import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Cart } from 'src/Entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart]), AuthModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { Cart } from 'src/Entities/cart.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'we_love_exercise',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Cart]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

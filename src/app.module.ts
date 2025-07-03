import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/User.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './product-admin/product.module';
import { Product } from './Entities/Product.entity';
import { AuthModule } from './auth/auth.module';
import { ProductUserModule } from './product-user/product-user.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './Entities/cart.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb', // نوع قاعدة البيانات
      host: 'localhost', // عنوان السيرفر
      port: 3306, // المنفذ
      username: 'root', // اسم المستخدم
      password: 'hello', // كلمة المرور
      database: 'User',
      entities: [User, Product, Cart],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      path: 'apiGraphQL',
    }),
    UserModule,
    ProductModule,
    AuthModule,
    ProductUserModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

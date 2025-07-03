import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';
import { UserDtoC } from 'src/auth/Dto/Create_User.dto';
import { FindUserInput } from 'src/auth/Dto/find-user.dto';
import { UserDtoU } from 'src/auth/Dto/Update_User.dto';
import { Cart } from 'src/Entities/cart.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    @InjectRepository(Cart)
    private readonly CartRepo: Repository<Cart>,


  ) {}

  async findAllUsers() {
    return await this.UserRepo.find();
  }

  async findOneUser(id: FindUserInput) {
    const user = await this.UserRepo.findOne({ where: { id: id.id } });
    if (!user) {
      throw new NotFoundException(`User with Id ${id.id} not found`);
    }
    return user;
  }

  async createUser(UserDtoC: UserDtoC): Promise<User> {
    const newUser = this.UserRepo.create(UserDtoC);
    const newCart = this.CartRepo.create();
    newCart.id = newUser.id;
    await this.CartRepo.save(newCart)
    return await this.UserRepo.save(newUser);
  }
  
  


  async updateUser(id: number, UserDtoU: UserDtoU): Promise<User> {
    const user = await this.UserRepo.preload({ id: id, ...UserDtoU });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.UserRepo.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.UserRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.UserRepo.delete(id);
    return user;
  }
}

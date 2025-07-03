import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/Entities/User.entity';
import { UserDtoC } from 'src/auth/Dto/Create_User.dto';
import { FindUserInput } from 'src/auth/Dto/find-user.dto';
import { UserDtoU } from 'src/auth/Dto/Update_User.dto';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user/user.guard';

UseGuards(UserGuard);
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => User)
  async findOneUser(@Args('id') id: FindUserInput): Promise<User> {
    return await this.userService.findOneUser(id);
  }

  @Mutation(() => User)
  async createUser(@Args('user') UserDtoC: UserDtoC): Promise<User> {
    return this.userService.createUser(UserDtoC);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('user') UserDtoU: UserDtoU,
  ): Promise<User> {
    return this.userService.updateUser(id, UserDtoU);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}

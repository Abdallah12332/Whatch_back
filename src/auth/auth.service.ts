import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { Repository } from 'typeorm';
import { UserDtoC } from './Dto/Create_User.dto';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/Entities/cart.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(Cart)
    private readonly CartRepo: Repository<Cart>,
  ) {}

  async register(UserDtoC: UserDtoC): Promise<string> {
    const { reel_username, password } = UserDtoC;

    const existuser = await this.UserRepo.findOne({
      where: { reel_username: reel_username },
    });

    if (existuser) {
      throw new ConflictException('choose unique reel_username');
    }

    const hashed_password = await bcrypt.hash(password, 10);
    UserDtoC.password = hashed_password;
    UserDtoC.role = 'user';
    const user = this.UserRepo.create(UserDtoC);
    const cart = this.CartRepo.create();
    cart.reel_username = user.reel_username;
    await this.UserRepo.save(user);
    await this.CartRepo.save(cart);

    const payload = {
      username: UserDtoC.username,
      reel_username: UserDtoC.reel_username,
      role: UserDtoC.role,
    };

    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async login(UserDtoC: UserDtoC): Promise<string | UserDtoC> {
    const { reel_username, password } = UserDtoC;
    const user = await this.UserRepo.findOne({
      where: { reel_username },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hashed_password = user?.password;
    const verify_passwrod = await bcrypt.compare(password, hashed_password);

    if (!verify_passwrod) {
      throw new UnauthorizedException('the password is not correct');
    }

    const payload = {
      username: UserDtoC.username,
      reel_username: UserDtoC.reel_username,
      role: UserDtoC.role,
    };

    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async logout(UserDtoC: UserDtoC): Promise<string> {
    const { reel_username } = UserDtoC;

    const existuser = await this.UserRepo.findOne({
      where: { reel_username: reel_username },
    });

    if (!existuser) {
      throw new UnauthorizedException('user not found');
    }
    const message = 'ok';
    return message;
  }
}

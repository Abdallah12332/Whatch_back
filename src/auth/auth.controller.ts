import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDtoC } from './Dto/Create_User.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('register')
  async register(
    @Body() UserDtoC: UserDtoC,
    @Res() res: Response,
  ): Promise<string | Response | UserDtoC> {
    const access_token = await this.authservice.register(UserDtoC);
    return res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      })
      .status(201)
      .json({ access_token });
  }

  @Post('login')
  async login(
    @Body() UserDtoC: UserDtoC,
    @Res() res: Response,
  ): Promise<string | Response> {
    const access_token = await this.authservice.login(UserDtoC);
    return res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      })
      .status(201)
      .json({ access_token });
  }

  @Post('logout')
  async logout(
    @Body() UserDtoC: UserDtoC,
    @Res() res: Response,
  ): Promise<Response> {
    const message = await this.authservice.logout(UserDtoC);
    return res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      })
      .json(message)
      .status(201);
  }
}

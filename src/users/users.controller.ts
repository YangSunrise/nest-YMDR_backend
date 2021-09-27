import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { IdentityBody, UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  Register(@Body() data: IdentityBody) {
    return this.usersService.addOne(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.getUserInfo(req.user);
  }

  @Post('getRegCode')
  getRegCode(@Body() data: { email: string }) {
    const regText = RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g);
    if (data.email && regText.test(data.email)) {
      return this.usersService.setEmail(data.email);
    } else {
      throw new BadRequestException();
    }
  }
}

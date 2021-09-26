import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  Query,
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

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  updateUser(@Request() req, @Body() body) {
    return this.usersService.upDateUserInfo(req.user, body);
  }
}

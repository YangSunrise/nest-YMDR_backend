import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { IdentityBody, UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  Register(@Body() data: IdentityBody) {
    console.log(data);
    return this.usersService.addOne(data);
  }
  //   @UseGuards(AuthGuard('jwt'))
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }
}

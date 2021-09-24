import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/users/userAuth.entity';
import { IdentityBody } from 'src/users/users.service';

import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private usersAuthRepository: Repository<UserAuth>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(args: IdentityBody): Promise<any> {
    console.log(args);
    const user = await this.usersAuthRepository.findOne({
      identity_type: args.identity_type,
      identifier: args.identifier,
    });
    if (user && user.credential === args.credential) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user.id;
    }
    return null;
  }
  async existUser(args: IdentityBody): Promise<any> {
    const user = await this.usersAuthRepository.findOne({
      identity_type: args.identity_type,
      identifier: args.identifier,
    });
    if (user) {
      return true;
    } else return false;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

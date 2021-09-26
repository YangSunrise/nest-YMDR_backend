import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/users/userAuth.entity';
import { IdentityBody } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Users } from 'src/users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private usersAuthRepository: Repository<UserAuth>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(identifier: string, credential: string): Promise<any> {
    const user = await this.usersAuthRepository.find({
      where: { identifier: identifier },
      relations: ['user'],
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcryptjs');
    if (user && bcrypt.compareSync(credential, user[0].credential)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user[0].user;
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
  async login(user: Users) {
    const payload = { username: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

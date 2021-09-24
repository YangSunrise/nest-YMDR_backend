import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserAuth } from './userAuth.entity';

export interface IdentityBody {
  identity_type: string;
  identifier: string;
  credential: string;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserAuth)
    private usersAuthRepository: Repository<UserAuth>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  /**  get current user info */
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.usersAuthRepository.find((user) => user.username === username);
  // }
  /**
   * 注册用户信息
   * @param args
   */
  async addOne(args: IdentityBody): Promise<any> {
    const User = new Users();
    // if (this.authService.validateUser(args)) {
    // }
  }
}

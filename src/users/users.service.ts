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

    User.avatar = 'http://..ashgj';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dayjs = require('dayjs');
    User.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    User.modification_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    User.nickname = args.identifier;

    const userAuth = new UserAuth();

    userAuth.credential = args.credential;
    userAuth.identifier = args.identifier;
    userAuth.identity_type = args.identity_type;
    userAuth.user = User;

    await this.usersRepository.save(User).then((res) => console.log(res.id));
    await this.usersAuthRepository.save(userAuth);
    console.log(User, userAuth);
  }
}

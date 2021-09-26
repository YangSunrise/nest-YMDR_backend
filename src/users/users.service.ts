import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserAuth } from './userAuth.entity';

import { promisify } from 'util';
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

  async bcryptHash(myPlaintextPassword, cost): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcryptjs');
    const salt = await promisify(bcrypt.genSalt)(cost);

    const hash = await promisify(bcrypt.hash)(myPlaintextPassword, salt);

    return hash;
  }
  async getUserInfo(user: any): Promise<any> {
    const userInfo = await this.usersRepository.findOne(user.userId);
    if (userInfo) {
      return {
        code: 200,
        data: userInfo,
        success: true,
      };
    } else
      return {
        code: 200,
        data: [],
        success: false,
      };
  }
  upDateUserInfo() {
    return;
  }
  /**
   * 注册用户信息
   * @param args
   */
  async addOne(args: IdentityBody): Promise<any> {
    const user = await this.usersAuthRepository.find({
      identifier: args.identifier,
    });
    if (user) {
      return {
        code: 200,
        data: { success: false, message: '用户已存在' },
      };
    } else {
      const User = new Users();
      User.avatar = 'http://..ashgj';

      User.nickname = args.identifier;

      const userAuth = new UserAuth();
      const credential = await this.bcryptHash(args.credential, 10);
      userAuth.credential = credential;
      userAuth.identifier = args.identifier;
      userAuth.identity_type = args.identity_type;
      userAuth.user = User;

      await this.usersRepository.save(User).then((res) => console.log(res.id));
      await this.usersAuthRepository.save(userAuth);
      return {
        code: 200,
        data: { success: true, message: '注册成功' },
      };
    }
  }
}

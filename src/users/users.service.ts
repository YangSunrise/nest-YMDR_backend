import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserAuth } from './userAuth.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { promisify } from 'util';
import { Router } from './router.entity';
export interface IdentityBody {
  identity_type: string;
  identifier: string;
  credential: string;
  verification_code: string;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserAuth)
    private usersAuthRepository: Repository<UserAuth>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Router)
    private RouterRepository: Repository<Router>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addModule() {
    const router = new Router();
    router.name = 'markdown';
    router.description = 'markdown编辑';
    router.icon = 'markdown';
    (router.path = 'note/ui/markdown-edit'), (router.url = 'markdown');
    await this.RouterRepository.save(router);
  }

  async bcryptHash(myPlaintextPassword, cost): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcryptjs');
    const salt = await promisify(bcrypt.genSalt)(cost);
    const hash = await promisify(bcrypt.hash)(myPlaintextPassword, salt);
    return hash;
  }
  async getUserInfo(user: any): Promise<any> {
    const userInfo = await this.usersRepository.findOne(user.userId);
    const { authority } = userInfo;
    /** 查找路由权限 */
    const authorityDetail = await Promise.all(
      authority.map(async (v) => {
        return await this.RouterRepository.findOne({ id: v });
      }),
    );
    if (userInfo) {
      return {
        code: 200,
        data: { ...userInfo, authorityDetail },
        success: true,
      };
    } else
      return {
        code: 200,
        data: {},
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
    /** 判断验证码正确与否 */
    const verification_code = await this.cacheManager.get(args.identifier);
    if (verification_code != args.verification_code) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        error: '邮箱验证码错误',
      };
    }

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
  /** 创建验证码 */
  createCode(): string {
    const arr = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ] as string[];
    let regCode = '';
    for (let i = 0; i < 4; i++) {
      //生成0-35的随机数
      regCode = regCode.concat(arr[Number((Math.random() * 36).toFixed(0))]);
    }
    return regCode;
  }

  /** 发送验证码 */
  async setEmail(url: string): Promise<void> {
    const regCode = this.createCode();
    await this.cacheManager.set(url, regCode, { ttl: 3600 });
    const transporter = nodemailer.createTransport({
      service: 'qq',
      port: 465,
      secure: false,
      auth: {
        user: '1256003290@qq.com',
        pass: 'edtyywxvjomcgeji',
      },
    });

    transporter.sendMail({
      from: '杨明升 <1256003290@qq.com>',
      to: url,
      subject: '个人博客注册申请',

      html: `
      <head>
      <base target="_blank" />
      <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
      <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
      <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
      <style type="text/css">
          body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
          td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
          pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
          th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
          img{ border:0}
          header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
          blockquote{margin-right:0px}
          </style>
      </head>
      <body tabindex="0" role="listitem">
      <table width="700" border="0" align="center" cellspacing="0" style="width:1280px;">
          <tbody>
          <tr>
              <td>
                  <div style="width:700px;margin:0 auto;margin-bottom:30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                          <tbody><tr><td width="210"></td></tr></tbody>
                      </table>
                  </div>
                  <div style="width:680px;padding:0 10px;margin:0 auto;">
                      <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                          <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                          <strong style="display:block;margin-bottom:15px;">
                              您正在进行<span style="color: red">博客个人账号申请</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${regCode}</span>，以完成操作。
                          </strong>
                      </div>
                   
                      <div style="margin-bottom:30px;">
                          <small style="display:block;margin-bottom:20px;font-size:12px;">
                              <p style="color:#747474;">
                                  注意：过期时间为一个小时

                              </p>
                          </small>
                      </div>
                  </div>
                  <div style="width:700px;margin:0 auto;">
                      <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                          <p>此为系统邮件，请勿回复<br>
                              请保管好您的邮箱，避免账号被他人盗用
                          </p>
                          <p>管理员: 杨明升</p>
                      </div>
                  </div>
              </td>
          </tr>
          </tbody>
      </table>
      </body>`,
    });
  }
}

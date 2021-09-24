import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';
import { UserAuth } from 'src/users/userAuth.entity';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      /**私钥 */
      secret: jwtConstants.privateSecret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserAuth, Users]),
  ],
  exports: [AuthService],
})
export class AuthModule {}

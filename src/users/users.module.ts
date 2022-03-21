import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserAuth } from './userAuth.entity';
import { Router } from './router.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth, Users,Router]),
    CacheModule.register(),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

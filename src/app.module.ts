import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MarkdownFileModule } from './markdown-system/file.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.register(),
    AuthModule,
    UsersModule,
    MarkdownFileModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

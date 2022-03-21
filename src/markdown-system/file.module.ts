import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { MarkdownFileController } from './file.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserAuth, Users]),
    // CacheModule.register(),
  ],
  providers: [FileService],
  controllers: [MarkdownFileController],
})
export class MarkdownFileModule {}

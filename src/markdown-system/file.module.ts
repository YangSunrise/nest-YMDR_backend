import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { MarkdownFileController } from './file.controller';
import { MarkdownFile } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MarkdownFile])],
  providers: [FileService],
  controllers: [MarkdownFileController],
})
export class MarkdownFileModule {}

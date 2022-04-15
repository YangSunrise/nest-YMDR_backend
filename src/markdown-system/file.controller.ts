import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('markdown-file')
export class MarkdownFileController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { data: req.user };
  }
  
}

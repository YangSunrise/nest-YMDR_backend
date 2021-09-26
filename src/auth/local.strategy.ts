import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IdentityBody } from 'src/users/users.service';
import express from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'identifier',
      passwordField: 'credential',
    });
  }

  async validate(identifier: string, credential: string): Promise<any> {
    const user = await this.authService.validateUser(identifier, credential);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

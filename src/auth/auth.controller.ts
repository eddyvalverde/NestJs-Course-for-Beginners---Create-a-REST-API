import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Request) {
    console.log(req);
    console.log(req.body);
    return this.authService.login();
  }
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}

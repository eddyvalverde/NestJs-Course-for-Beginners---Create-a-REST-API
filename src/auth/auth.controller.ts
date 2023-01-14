import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  login() {
    return { msg: 'I am signed in' };
  }
  @Post('signup')
  signup(): string {
    return 'I am signed up';
  }
}

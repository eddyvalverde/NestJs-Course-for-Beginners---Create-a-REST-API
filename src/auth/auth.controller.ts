import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Body() dto: AuthDto) {
    console.log(dto);
    //console.log(req.body);
    if (!dto.email) return 'it failed';
    else return this.authService.login();
  }
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}

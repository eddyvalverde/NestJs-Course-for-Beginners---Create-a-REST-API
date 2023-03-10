import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Body() dto: AuthDto) {
    //console.log(dto);
    //console.log(req.body);
    return this.authService.login(dto);
  }
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}

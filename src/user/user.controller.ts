import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { User } from '@prisma/client';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@GetUser('') user: User) {
    return user;
  }
}

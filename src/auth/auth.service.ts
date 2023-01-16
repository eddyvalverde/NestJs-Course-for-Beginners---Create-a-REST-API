import { Injectable, Post } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { msg: 'I am signed in' };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save the new user in db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    //return saved user
    return user;
  }
}

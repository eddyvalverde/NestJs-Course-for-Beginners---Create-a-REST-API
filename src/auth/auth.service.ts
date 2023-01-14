import { Injectable, Post } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { msg: 'I am signed in' };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signup() {
    return { msg: 'I am signed up' };
  }
}

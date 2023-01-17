import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findFirst(
      {
        where: {
          email: dto.email,
        },
      },
    );
    // if user does not exist throw error
    if (!user)
      throw new ForbiddenException(
        'Credentials Incorrect',
      );
    //compare passwords
    const passwordMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //if password incorrect throw exception
    if (!passwordMatches)
      throw new ForbiddenException(
        'Credentials Incorrect',
      );
    //send back the user
    delete user.hash;
    return user;
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

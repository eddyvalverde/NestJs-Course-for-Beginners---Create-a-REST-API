import {
  ForbiddenException,
  Injectable,
  Post,
} from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    //find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
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
    return this.signToken(user.id, user.email);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signup(dto: AuthDto) {
    //find the user by email
    const userExist =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save the new user in db
    if (!userExist) {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return user;
    } else {
      throw new ForbiddenException(
        'User already exists',
      );
    }
  }

  signToken(
    userId: number,
    email: string,
  ): Promise<string> {
    //create payload with necessary information to generate jwt
    const payload = {
      sub: userId,
      email,
    };
    //find secret in .env file
    const secret = this.config.get('JWT_SECRET');
    //return jwt
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
  }
}

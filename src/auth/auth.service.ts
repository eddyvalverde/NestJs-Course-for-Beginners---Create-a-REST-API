import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { msg: 'I am signed in' };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signup() {
    return { msg: 'I am signed up' };
  }
}

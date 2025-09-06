import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1. 유저 조회
    const user = await this.authRepository.findUserByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 3. JWT 발급
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserCoreService } from 'src/core/service/user-core/user-core.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userCoreService: UserCoreService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<TokenDto> {
    const user = await this.userCoreService.findOne(username);

    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.getSecretKey(),
    });

    return {
      access_token: accessToken,
    } as TokenDto;
  }

  private getSecretKey(): string {
    return this.configService.get<string>('APP_JWT_SECRET_KEY') || 'nothing';
  }
}

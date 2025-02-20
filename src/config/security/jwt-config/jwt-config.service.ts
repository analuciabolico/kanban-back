import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const secretKey = this.configService.get<string>('APP_JWT_SECRET_KEY');
    const expires = this.configService.get<string>('APP_JWT_EXPIRES');

    return {
      global: true,
      secret: secretKey,
      signOptions: { expiresIn: expires },
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || '';
  }

  getPort(): number {
    return this.configService.get<number>('PORT') || 0;
  }

  getSecretKey(): string {
    return this.configService.get<string>('SECRET_KEY') || '';
  }
}

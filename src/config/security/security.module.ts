import { Module } from '@nestjs/common';
import { JwtConfigService } from './jwt-config/jwt-config.service';

@Module({
  providers: [JwtConfigService],
})
export class SecurityModule {}

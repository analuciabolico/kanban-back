import { Module } from '@nestjs/common';
import { UserCoreModule } from 'src/core/service/user-core/user-core.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserCoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

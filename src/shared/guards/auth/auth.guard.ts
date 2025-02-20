import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrincipalDto } from 'src/modules/auth/dto/principal.dto';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token Invalido ou vazio');
    }

    try {
      const payload: PrincipalDto = await this.jwtService.verifyAsync(token, {
        secret: this.getSecretKey(),
      });

      request['user'] = payload;
    } catch (exception: any) {
      const message = exception.message || 'Internal Server Error';

      throw new UnauthorizedException(message);
    }

    return true;
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getSecretKey(): string {
    return this.configService.get<string>('APP_JWT_SECRET_KEY') || 'nothing';
  }
}

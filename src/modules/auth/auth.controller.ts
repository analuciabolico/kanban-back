import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public/public.decorator';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Exemplo OK' })
  async login(@Body() user: UserDto): Promise<TokenDto> {
    return await this.authService.signIn(user.username, user.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public/public.decorator';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { AuthService } from './auth.service';
import { PrincipalDto } from './dto/principal.dto';
import { TokenDto } from './dto/token.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('auth')
@ApiHeader({
  name: 'X-API-Version',
  description: 'Version header',
  allowEmptyValue: true,
  example: '1',
})
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Exemplo OK', type: TokenDto })
  async login(@Body() user: UserDto): Promise<TokenDto> {
    return await this.authService.signIn(user.username, user.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Exemplo OK', type: PrincipalDto })
  async getProfile(@Req() req: any): Promise<PrincipalDto> {
    return req.user;
  }
}

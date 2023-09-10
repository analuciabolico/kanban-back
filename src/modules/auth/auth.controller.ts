import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  //   @ApiOkResponse({ description: 'Exemplo OK' })
  login(): Array<string> {
    return [];
  }
}

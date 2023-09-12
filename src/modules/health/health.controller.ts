import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Public } from 'src/shared/decorators/public/public.decorator';

@ApiTags('health')
@ApiHeader({
  name: 'X-API-Version',
  description: 'Version header',
  allowEmptyValue: true,
  example: '1',
})
@Controller({
  path: 'health',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}

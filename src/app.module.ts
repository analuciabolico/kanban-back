import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { DatabasesModule } from './config/databases/databases.module';
import { TypeOrmConfigService } from './config/databases/type-orm-config/type-orm-config.service';
import { LoggingsModule } from './config/loggings/loggings.module';
import { JwtConfigService } from './config/security/jwt-config/jwt-config.service';
import { SecurityModule } from './config/security/security.module';
import { CardCoreModule } from './core/service/card-core/card-core.module';
import { UserCoreModule } from './core/service/user-core/user-core.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule as AuthGuardModule } from './shared/guards/auth/auth.module';
import { LoggingMutationMiddleware } from './shared/middlewares/logging-mutation/logging-mutation.middleware';
import { LoggingMiddleware } from './shared/middlewares/logging/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabasesModule.registerAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthGuardModule,
    LoggingsModule,
    DatabasesModule,
    AuthModule,
    CardsModule,
    CardCoreModule,
    UserCoreModule,
    SecurityModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(LoggingMutationMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.PUT },
        { path: '*', method: RequestMethod.PATCH },
        { path: '*', method: RequestMethod.DELETE },
      );
  }
}

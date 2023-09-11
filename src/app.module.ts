import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabasesModule } from './config/databases/databases.module';
import { TypeOrmConfigService } from './config/databases/type-orm-config/type-orm-config.service';
import { LoggingsModule } from './config/loggings/loggings.module';
import { AuthCoreModule } from './core/service/auth-core/auth-core.module';
import { CardCoreModule } from './core/service/card-core/card-core.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
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
    LoggingsModule,
    DatabasesModule,
    AuthModule,
    CardsModule,
    AuthCoreModule,
    CardCoreModule,
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

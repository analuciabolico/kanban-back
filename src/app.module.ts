import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasesModule } from './config/databases/databases.module';
import { LoggingsModule } from './config/loggings/loggings.module';
import { Card } from './core/domain/entities/card.entity';
import { AuthCoreModule } from './core/service/auth-core/auth-core.module';
import { CardCoreModule } from './core/service/card-core/card-core.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { LoggingMiddleware } from './shared/middlewares/logging/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // DatabasesModule.registerAsync({
    //   useClass: TypeOrmConfigService,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'kanban',
      logging: true,
      entities: [Card],
      // autoLoadEntities: true,
      synchronize: true,
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
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

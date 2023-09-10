import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MysqlService } from './mysql/mysql.service';
import { TypeOrmConfigService } from './type-orm-config/type-orm-config.service';

@Module({
  imports: [ConfigModule],
  providers: [TypeOrmConfigService, MysqlService],
})
export class DatabasesModule {
  static registerAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      module: DatabasesModule,
      imports: [TypeOrmModule.forRootAsync(options)],
    };
  }
}

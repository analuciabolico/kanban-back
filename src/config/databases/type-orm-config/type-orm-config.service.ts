import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { APPLICATION } from 'src/constants';
import { MysqlService } from '../mysql/mysql.service';
import { SqliteService } from '../sqlite/sqlite.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const type = APPLICATION.DB.TYPE;

    switch (type) {
      case 'sqlite':
        return SqliteService.config();
      case 'mysql':
        return MysqlService.config();

      default:
        return SqliteService.config();
    }
  }
}

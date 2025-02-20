import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APPLICATION } from 'src/constants';

@Injectable()
export class SqliteService {
  static config(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'sqlite',
      database: `${APPLICATION.DB.DATABASE}.sqlite`,
      // logging: true,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

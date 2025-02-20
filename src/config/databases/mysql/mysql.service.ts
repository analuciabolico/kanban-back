import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APPLICATION } from 'src/constants';

@Injectable()
export class MysqlService {
  static config(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: APPLICATION.DB.HOST,
      port: Number(APPLICATION.DB.PORT),
      username: APPLICATION.DB.USERNAME,
      password: APPLICATION.DB.PASSWORD,
      database: APPLICATION.DB.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

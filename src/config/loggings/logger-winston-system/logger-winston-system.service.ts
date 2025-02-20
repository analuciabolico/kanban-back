import { Injectable } from '@nestjs/common';
import { APPLICATION } from 'src/constants';
import * as Winston from 'winston';

@Injectable()
export class LoggerWinstonSystemService {
  static getLoger(): Winston.Logger {
    return Winston.createLogger({
      defaultMeta: {
        service: APPLICATION.LOG.METAS.SERVICE,
      },
      level: APPLICATION.LOG.LEVEL || 'info',
      format: Winston.format.combine(
        Winston.format.label({ label: APPLICATION.LOG.CATEGORY }),
        Winston.format.colorize({ all: true }),
        Winston.format.timestamp({
          format: 'DD/MM/YYYY hh:mm:ss A',
        }),
        Winston.format.align(),
        Winston.format.printf(
          (info) =>
            `[${info.timestamp}] - [${info.label}: ${info.service}] => [${info.level}]: ${info.message}`,
        ),
      ),
      transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({
          filename: 'logs/server.log',
          format: Winston.format.json(),
        }),
      ],
    });
  }
}

// https://github.com/winstonjs/winston
// https://reflectoring.io/node-logging-winston
// https://www.section.io/engineering-education/logging-with-winston
// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications

import { Injectable } from '@nestjs/common';
import * as Winston from 'winston';

@Injectable()
export class LoggerWinstonSystemService {
  static getLoger(): Winston.Logger {
    return Winston.createLogger({
      defaultMeta: {
        service: 'kanban-service',
      },
      level: process.env.LOG_LEVEL || 'info',
      format: Winston.format.combine(
        Winston.format.colorize({ all: true }),
        Winston.format.timestamp({
          // format: 'YYYY-MM-DD hh:mm:ss.SSS A',
          format: 'DD/MM/YYYY hh:mm:ss',
        }),
        Winston.format.align(),
        Winston.format.printf(
          (info) =>
            `[${info.service}] - ${info.timestamp}  -  ${info.level}: ${info.message}`,
        ),
      ),
      transports: [new Winston.transports.Console()],
    });
  }
}

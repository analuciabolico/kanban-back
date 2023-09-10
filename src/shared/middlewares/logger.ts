import * as Winston from 'winston';

// https://github.com/winstonjs/winston
// https://reflectoring.io/node-logging-winston/
// https://www.section.io/engineering-education/logging-with-winston/
// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
export const LOGGER = Winston.createLogger({
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

// function log() {
//   const winston = require('winston');
//   const { combine, timestamp, printf, colorize, align } = winston.format;

//   const logger = winston.createLogger({
//     level: process.env.LOG_LEVEL || 'info',
//     format: combine(
//       colorize({ all: true }),
//       timestamp({
//         format: 'YYYY-MM-DD hh:mm:ss.SSS A',
//       }),
//       align(),
//       printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
//     ),
//     transports: [new winston.transports.Console()],
//   });

//   logger.info('Info message');
//   logger.error('Error message');
//   logger.warn('Warning message');
// }

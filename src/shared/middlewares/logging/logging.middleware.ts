import { Injectable, NestMiddleware } from '@nestjs/common';
import { LOGGER } from '../logger';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const split = ' - ';
    const prefix = '[Request]';
    const statusCode = res.statusCode;
    const path = req.originalUrl;
    const message = prefix + split + statusCode + split + path;

    LOGGER.info(message);
    next();
  }
}

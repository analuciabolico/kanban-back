import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerWinstonSystemService } from 'src/config/loggings/logger-winston-system/logger-winston-system.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const message = `[New Request from ROUTE: ${req.path}]`;

    LoggerWinstonSystemService.getLoger().info(message);

    next();
  }
}

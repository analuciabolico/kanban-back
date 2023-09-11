import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerWinstonSystemService } from 'src/config/loggings/logger-winston-system/logger-winston-system.service';

@Injectable()
export class LoggingMutationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const [resource, id] = req.params[0]?.split('/') || ['N/A', 'N/A'];
    const title = req.body.titulo || 'N/A';
    const action =
      req.method === 'PUT' || req.method === 'PATCH'
        ? 'Alterar'
        : req.method === 'DELETE'
        ? 'Remover'
        : 'N/A';

    const message = `[${
      req.method
    }]: ${resource.toUpperCase()} ${id} - [Titulo: ${title}] - [${action}]`;

    LoggerWinstonSystemService.getLoger().warn(message);

    next();
  }
}

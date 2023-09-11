import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerWinstonSystemService } from 'src/config/loggings/logger-winston-system/logger-winston-system.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    // LoggerWinstonSystemService.getLoger().error(exception.stack);
    LoggerWinstonSystemService.getLoger().error(message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.route['path'],
      message: message,
    });
  }
}

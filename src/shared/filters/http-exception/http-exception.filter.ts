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
    const message = exception.message || 'N/A';
    const error = exception.name || 'N/A';
    const path = request?.route?.path || 'N/A';

    // Toggle comment for enable show Stack trace from exceptions on console.
    // LoggerWinstonSystemService.getLoger().error(exception.stack);
    LoggerWinstonSystemService.getLoger().error(message);

    response.status(status).json({
      statusCode: status,
      path: path,
      error: error,
      message: message,
    });
  }
}

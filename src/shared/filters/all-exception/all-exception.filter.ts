import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerWinstonSystemService } from 'src/config/loggings/logger-winston-system/logger-winston-system.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const message = exception?.message || 'Internal Server Error';
    const error = exception?.error || 'Internal Server Error';

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      path: path,
      error: error,
      message: message,
    };

    LoggerWinstonSystemService.getLoger().error(message);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

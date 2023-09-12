import {
  ExceptionFilter,
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  AbstractHttpAdapter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as DotENV from 'dotenv';
import { AppModule } from './app.module';
import { LoggerWinstonSystemService } from './config/loggings/logger-winston-system/logger-winston-system.service';
import { APPLICATION } from './constants';
import { AllExceptionsFilter } from './shared/filters/all-exception/all-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception/http-exception.filter';

DotENV.config();

type ExceptionFilterDefault = ExceptionFilter<any>[];
type HttpAdapterDefault = HttpAdapterHost<AbstractHttpAdapter<any, any, any>>;
const BASE_PATH = '/api';
const DOCS = BASE_PATH + '/docs';

function swagger() {
  return new DocumentBuilder()
    .setTitle(APPLICATION.SWAGGER.TITLE)
    .setDescription(APPLICATION.SWAGGER.DESCRIPTION)
    .setVersion(APPLICATION.SWAGGER.VERSION)
    .addBearerAuth({
      type: 'http',
      name: 'Bearer Auth',
    })
    .build();
}

function createFilters(
  httpAdapterHost: HttpAdapterDefault,
): ExceptionFilterDefault {
  return [new AllExceptionsFilter(httpAdapterHost), new HttpExceptionFilter()];
}

async function bootstrap() {
  const logger = LoggerWinstonSystemService.getLoger();

  logger.warn(`API Kanban listening on port ${APPLICATION.PORT}.....`);

  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const config = swagger();
  const filters = createFilters(httpAdapterHost);

  app.useGlobalFilters(...filters);
  app.setGlobalPrefix(BASE_PATH);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-Version',
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCS, app, document);

  await app.listen(APPLICATION.PORT);
}

bootstrap();

import { ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as DotENV from 'dotenv';
import { AppModule } from './app.module';
import { APPLICATION } from './constants';
import { AllExceptionsFilter } from './shared/filters/all-exception/all-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception/http-exception.filter';
import { LOGGER } from './shared/middlewares/logger';

DotENV.config();

async function bootstrap() {
  LOGGER.warn(
    `========== Backend Kanban listening on port ${APPLICATION.PORT} ==========`,
  );

  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const config = new DocumentBuilder()
    .setTitle(APPLICATION.SWAGGER.TITLE)
    .setDescription(APPLICATION.SWAGGER.DESCRIPTION)
    .setVersion(APPLICATION.SWAGGER.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const filters: ExceptionFilter<any>[] = [
    new AllExceptionsFilter(httpAdapterHost),
    new HttpExceptionFilter(),
  ];

  app.useGlobalFilters(...filters);
  app.setGlobalPrefix('/api');

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(APPLICATION.PORT);
}

bootstrap();

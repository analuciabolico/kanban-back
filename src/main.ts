import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as DotENV from 'dotenv';
import { AppModule } from './app.module';
import { APPLICATION } from './constants';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { LOGGER } from './shared/middlewares/logger';

DotENV.config();

async function bootstrap() {
  LOGGER.warn(
    `========== Backend Kanban listening on port ${APPLICATION.PORT} ==========`,
  );

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(APPLICATION.SWAGGER.TITLE)
    .setDescription(APPLICATION.SWAGGER.DESCRIPTION)
    .setVersion(APPLICATION.SWAGGER.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/api');

  await app.listen(APPLICATION.PORT);
}

bootstrap();

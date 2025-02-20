export const APPLICATION = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.NODE_PORT || 5000,
  TITLE: process.env.APP_TITLE || 'quadro-kanban-api',
  PREFIX: process.env.APP_PREFIX || 'api',
  JWT: {
    SECRET_KEY: process.env.APP_JWT_SECRET_KEY || 'nothing',
    EXPIRES: process.env.APP_JWT_EXPIRES || '60s',
  },
  SWAGGER: {
    TITLE: process.env.APP_SWAGGER_TITLE || 'API Quadro Kanban',
    DESCRIPTION:
      process.env.APP_SWAGGER_DESCRIPTION || 'API de Quadro Kanban descrição.',
    VERSION: process.env.NODE_TITLE || 'v0.0.1',
  },
  USER: {
    NAME: process.env.APP_USERNAME || 'username',
    PASSWORD: process.env.APP_PASSWORD || 'password',
  },
  DB: {
    TYPE: process.env.APP_DB_HOST || 'sqlite',
    HOST: process.env.APP_DB_HOST || 'localhost',
    PORT: process.env.APP_DB_PORT || 3306,
    USERNAME: process.env.APP_DB_USERNAME || 'root',
    PASSWORD: process.env.APP_DB_PASSWORD || 'root',
    DATABASE: process.env.APP_DB_DATABASE || 'kanban',
  },
  LOG: {
    LEVEL: 'info',
    CATEGORY: 'APPLICATION',
    METAS: {
      SERVICE: 'API_KANBAN',
    },
  },
};

// https://github.com/nestjs/nest/blob/master/sample/25-dynamic-modules/src/config/config.module.ts

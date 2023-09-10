export const APPLICATION = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.NODE_PORT || 5000,
  TITLE: process.env.APP_TITLE || 'quadro-kanban-api',
  PREFIX: process.env.APP_PREFIX || 'api',
  SWAGGER: {
    TITLE: process.env.APP_SWAGGER_TITLE || 'API Quadro de Kanban',
    DESCRIPTION:
      process.env.APP_SWAGGER_DESCRIPTION || 'API de Quadro Kanban descrição.',
    VERSION: process.env.NODE_TITLE || 'v0.0.1',
  },
};

// https://github.com/nestjs/nest/blob/master/sample/25-dynamic-modules/src/config/config.module.ts

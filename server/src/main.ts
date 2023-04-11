import 'reflect-metadata';

import { logger } from './config/logger';
import { configuration } from './config/configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function main(): Promise<INestApplication> {
  const server = await NestFactory.create(AppModule);
  server.setGlobalPrefix('api/v1');

  const { SERVER_PORT, SERVER_HOST } = configuration;

  server.listen(SERVER_PORT, SERVER_HOST, () => {
    logger.info(`Server listening on port: ${SERVER_PORT}`);
  });

  return server;
}

export default main();

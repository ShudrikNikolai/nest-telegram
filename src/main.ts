// import * as path from 'node:path';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigKeyPaths } from '@/config';
import { setupSwagger } from '@/swagger';
import { isDev, isMainProcess, isPrimaryProcess } from '@/global/env';
import { AppModule } from './app.module';
import { LoggerService } from '@/shared/logger/logger.service';
import { LoggingInterceptor } from '@/common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<ConfigKeyPaths>);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { port } = configService.get('app', { infer: true });

  // Inject the nest container dependency into the DTO class of class-validator (for custom validators)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // app.enableCors({ origin: '*', credentials: true });
  // app.setGlobalPrefix(`${globalPrefix}`);
  // app.useStaticAssets({ root: path.join(__dirname, 'templates') });

  if (isDev) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  } else {
    // Starts listening for shutdown hooks
    app.enableShutdownHooks();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true, // Prohibit data without decorator validation from passing
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new UnprocessableEntityException(
          errors.map((e: ValidationError) => {
            const rule = Object.keys(e.constraints!)[0];
            const msg = e.constraints![rule];

            return msg;
          })[0],
        ),
    }),
  );

  setupSwagger(app, configService);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await app.listen(+port, '0.0.0.0', async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const { pid } = process;
    const prefix = isPrimaryProcess ? 'P' : 'W';

    if (!isMainProcess) {
      return;
    }

    const logger = new Logger('NestApplication');

    logger.log(`[${prefix + pid}] Server running on ${url}`);

    if (isDev) {
      logger.log(`[${prefix + pid}] OpenAPI: ${url}/api-docs`);
    }
  });
}

bootstrap();

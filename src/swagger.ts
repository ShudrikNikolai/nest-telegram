import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { IAppConfig, ISwaggerConfig } from '@/config';
import { CommonEntity } from '@/common/entities/common.entity';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService<unknown>,
): void {
  const { name, port, version } = configService.get<IAppConfig>('app')!;
  const { enable, path } = configService.get<ISwaggerConfig>('swagger')!;

  if (!enable) {
    return;
  }

  const documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${name} API document`)
    .setVersion(version);

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [CommonEntity],
  });

  SwaggerModule.setup(path, app, document, {});

  const logger = new Logger('SwaggerModule');

  logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
}

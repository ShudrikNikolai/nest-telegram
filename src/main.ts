import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envNumber } from '@/global/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(envNumber('PORT') ?? 3000);
}
bootstrap();

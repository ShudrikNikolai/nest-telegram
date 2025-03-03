import { ConfigType, registerAs } from '@nestjs/config';
import { env, envNumber } from '@/global/env';

const globalPrefix = env('GLOBAL_PREFIX', 'api');

export const appRegToken = 'app';

export const AppConfig = registerAs(appRegToken, () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  baseUrl: env('APP_BASE_URL'),
  globalPrefix,
  locale: env('APP_LOCALE', 'ru-RU'),
  logger: {
    level: env('LOGGER_LEVEL'),
    maxFiles: envNumber('LOGGER_MAX_FILES'),
  },
}));

export type IAppConfig = ConfigType<typeof AppConfig>;

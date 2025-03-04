import { AppConfig, appRegToken, IAppConfig } from './app.config';
import { DatabaseConfig, dbRegToken, IDatabaseConfig } from './database.config';
import {
  ISwaggerConfig,
  SwaggerConfig,
  swaggerRegToken,
} from './swagger.config';
import {
  TelegramConfig,
  telegramRegToken,
  ITelegramConfig,
} from './telegram.config';

export * from './app.config';
export * from './database.config';
export * from './swagger.config';
export * from './telegram.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [dbRegToken]: IDatabaseConfig;
  [swaggerRegToken]: ISwaggerConfig;
  [telegramRegToken]: ITelegramConfig;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig,
  DatabaseConfig,
  SwaggerConfig,
  TelegramConfig,
};

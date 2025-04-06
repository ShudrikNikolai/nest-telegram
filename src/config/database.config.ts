import * as dotenv from 'dotenv';
import { ConfigType, registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { envBoolean, envString } from '@/global/env';

dotenv.config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: envString('DATABASE_URL'),
  synchronize: envBoolean('DATABASE_SYNCHRONIZE', true),
  logging: envBoolean('DATABASE_LOGGING', true),
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
};

export const dbRegToken = 'database';

export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions,
);

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

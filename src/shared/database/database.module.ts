import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, LoggerOptions } from 'typeorm';

import { ConfigKeyPaths, IDatabaseConfig } from '@/config';
import { env } from '@/global/env';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        let loggerOptions: LoggerOptions = env('DB_LOGGING') as 'all';

        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          loggerOptions = JSON.parse(loggerOptions);
        } catch {
          /**/
        }

        return {
          ...configService.get<IDatabaseConfig>('database'),
          autoLoadEntities: true,
          logging: loggerOptions,
        };
      },
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    }),
  ],
  exports: [],
})
export class DatabaseModule {}

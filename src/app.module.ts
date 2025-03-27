import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '@/config';

import { DatabaseModule } from '@/shared/database/database.module';
import { HealthModule } from '@/modules/health/health.module';
import { SharedModule } from '@/shared/shared.module';
import { TgModule } from '@/shared/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    DatabaseModule,
    TgModule,
    SharedModule,
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}

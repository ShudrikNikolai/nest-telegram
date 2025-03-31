import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '@/config';

import { DatabaseModule } from '@/shared/database/database.module';
import { HealthModule } from '@/modules/health/health.module';
import { SharedModule } from '@/shared/shared.module';
import { TgModule } from '@/modules/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [
        //'./config/.env.local',
        //`./config/.env.${process.env.NODE_ENV}`,
        './config/.env',
      ],
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

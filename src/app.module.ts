import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@/config';
import { DatabaseModule } from '@/shared/database/database.module';
import { TgModule } from '@/shared/telegram/telegram.module';
import { TodoModule } from '@/modules/todo/todo.module';
import { HealthModule } from '@/modules/health/health.module';

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
    TodoModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

import { TelegramModule } from '@/modules/telegram/telegram.module';
import { sessionMiddleware } from '@/modules/telegram/middleware/session.middleware';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN') ?? '',
        botName: configService.get<string>('TELEGRAM_NAME'),
        include: [TelegramModule],
        middlewares: [sessionMiddleware],
      }),
    }),
    TelegramModule,
  ],
})
export class TgModule {}

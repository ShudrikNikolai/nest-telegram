import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TelegramModule } from '@/shared/telegram/bots/base/telegram.module';
import { MemeTgModule } from '@/shared/telegram/bots/meme/meme.module';

import { TgSessionMiddleware } from './middlewares/tg-session.middleware';
import { MEME_BOT, TELEGRAM_BOT } from '@/shared/telegram/tg-app.constant';

// навернем говнеца тут, потом переделаю мб
@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: TELEGRAM_BOT,
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN') ?? '',
        botName: configService.get<string>('TELEGRAM_NAME'),
        include: [TelegramModule],
        middlewares: [TgSessionMiddleware],
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: MEME_BOT,
      useFactory: async (configService: ConfigService) => {
        return {
          token: configService.get<string>('MEME_TOKEN') ?? '',
          botName: configService.get<string>('MEME_NAME'),
          include: [MemeTgModule],
        };
      },
      inject: [ConfigService],
    }),
    MemeTgModule,
    TelegramModule,
  ],
})
export class TgModule {}

import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

import { TelegramModule } from '@/modules/telegram/telegram.module';
import { TgSessionMiddleware } from '@/common/middlewares/tg-session.middleware';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN') ?? '',
        botName: configService.get<string>('TELEGRAM_NAME'),
        include: [TelegramModule],
        middlewares: [TgSessionMiddleware],
      }),
    }),
    TelegramModule,
  ],
})
export class TgModule {}

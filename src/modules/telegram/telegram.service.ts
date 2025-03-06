import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { env } from '@/global/env';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot(env('TELEGRAM_USERNAME')) private bot: Telegraf,
    private configService: ConfigService,
  ) {}
}

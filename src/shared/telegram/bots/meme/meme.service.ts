import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { MEME_BOT } from '@/shared/telegram/tg-app.constant';

@Injectable()
export class MemeService {
  constructor(@InjectBot(MEME_BOT) private memeBot: Telegraf<Context>) {}
}

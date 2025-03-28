import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { MEME_BOT } from '@/constants/tg-name.constant';

@Injectable()
export class MemeService {
  constructor(@InjectBot(MEME_BOT) private memeBot: Telegraf<Context>) {}
}

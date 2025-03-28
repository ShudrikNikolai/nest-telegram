import { Help, Start, Update, Command, Ctx } from 'nestjs-telegraf';
import { Context } from '@/common/interfaces';

@Update()
export class MemeTgUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context): Promise<string> {
    await ctx.reply('CMD: /help | /meme', {
      reply_markup: {
        keyboard: [[{ text: '/help' }], [{ text: '/meme' }]],
        resize_keyboard: true,
      },
    });

    return "It's meme Jack";
  }

  @Help()
  async onHelp(@Ctx() ctx: Context): Promise<void> {
    await ctx.replyWithPhoto({ source: './assets/meme-ohota.jpeg' });
  }

  @Command('meme')
  async onTodoCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.replyWithPhoto({ source: './assets/memes.webp' });
  }
}

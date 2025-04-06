import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  On,
  Start,
  Update,
  Command,
  Ctx,
  Sender,
  Message,
  TelegrafException,
} from 'nestjs-telegraf';
import { TgResponseTimeInterceptor } from '@/common/interceptors/tg-response-time.interceptor';
import { TgTelegrafExceptionFilter } from '@/common/filters/tg-telegraf-exception.filter';
import { SneakCaseToCamelCasePipe } from '@/common/pipes/tg-sneak-to-camel.pipe';
import { Context, ITgBase, ITgCamel } from '@/common/interfaces';
import { TgAuthUsersGuard, TgAdminGuard } from '@/modules/auth/guards';
import { APP, CMD } from 'src/modules/telegram/bots/base/constants';
import { TelegramService } from './telegram.service';

// нахуя я всю эту херню нагородил хз
// код говна ибо \\\\\\\\\\\\\\\\\\\\
@Update()
@UseInterceptors(TgResponseTimeInterceptor)
@UseFilters(TgTelegrafExceptionFilter)
export class TelegramUpdate {
  constructor(private readonly tgService: TelegramService) {}

  @Start() // Переделаю мб когданить
  async onStart(
    @Sender(SneakCaseToCamelCasePipe) tgUser: ITgCamel.IUser,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    try {
      await this.tgService.registerUser(tgUser, chat);
    } catch (e) {
      console.error(e);
      throw new TelegrafException('REGISTER USER: FAILED');
    }
  }

  @Help()
  @UseGuards(TgAuthUsersGuard)
  async onHelp(@Message('chat') chat: ITgCamel.IChat): Promise<void> {
    await this.tgService.onHelp(chat.id);
  }

  @Command(CMD.TODO)
  @UseGuards(TgAuthUsersGuard)
  async onTodoCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(APP.TODO);
  }

  @Command(CMD.USERS)
  @UseGuards(TgAdminGuard)
  async onUsersCommand(@Message('chat') chat: ITgCamel.IChat): Promise<void> {
    await this.tgService.onUsersCommands(chat.id);
  }

  @On('contact')
  async onContact(
    @Message('contact', SneakCaseToCamelCasePipe) contact: ITgCamel.IContact,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    await this.tgService.approvePhoneUser(contact, chat);
  }

  @On('text')
  async onShitMessage(
    @Message('chat') chat: ITgBase.IChat,
    @Message('message_id') messageId: number,
  ): Promise<void> {
    await this.tgService.onDeleteRandomShitMessage(chat.id, messageId);
  }
}

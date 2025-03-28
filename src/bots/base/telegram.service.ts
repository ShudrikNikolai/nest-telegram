import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
// import { ObjectId } from 'typeorm'; // блятский ObjectId
import { env } from '@/global/env';
import { Context, ITgCamel } from '@/common/interfaces';
import { LoggerService } from '@/shared/logger/logger.service';
import { UserService } from '@/modules/user/user.service';
import { TodoService } from '@/modules/todo/todo.service';
import { TodoEntity } from '@/modules/todo/todo.entity';
import { APP, BUTTONS, TEXTS } from './constants';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot(env('TELEGRAM_USERNAME')) private botService: Telegraf,
    private readonly userService: UserService,
    private readonly todoService: TodoService,
    private readonly loggerService: LoggerService,
  ) {}

  async registerUser(
    tgUser: ITgCamel.IUser,
    chat: ITgCamel.IChat,
  ): Promise<void> {
    const user = await this.userService.findUserByTelegramId(tgUser.id);

    if (user) {
      if (user?.phoneApproved) {
        await this.botService.telegram.sendMessage(chat.id, TEXTS.START_FINAL);
      } else {
        await this.sendApprovePhoneButton(chat.id);
      }
    } else {
      await Promise.all([
        this.userService.create({
          lastName: tgUser.lastName,
          firstName: tgUser.firstName,
          username: tgUser.username,
          telegramId: tgUser.id,
        }),
        this.sendApprovePhoneButton(chat.id),
      ]);
    }
  }

  async approvePhoneUser(
    contact: ITgCamel.IContact,
    chat: ITgCamel.IChat,
  ): Promise<void> {
    // Мб когданить добью this.botService.telegram.setMyCommands()
    const user = await this.userService.approvePhone({
      lastName: contact?.lastName,
      firstName: contact?.firstName,
      phone: contact.phoneNumber,
      telegramId: contact?.userId,
    });

    if (user?.phoneApproved) {
      const [, userImg] = await Promise.all([
        this.sendMessage(chat?.id, TEXTS.START_FINAL),
        this.botService.telegram.getUserProfilePhotos(contact.userId),
      ]);

      if (userImg?.total_count) {
        await this.userService.updateUserByTelegramId(contact.userId, {
          avatar: `${userImg?.total_count}`,
        });
      }
    } else {
      await this.sendDefaultButtons(chat.id);
    }
  }

  async onHelp(chatId: number) {
    await this.sendDefaultButtons(chatId);
  }

  async onDeleteRandomShitMessage(
    chatId: number,
    messageId: number,
  ): Promise<void> {
    await this.botService.telegram.deleteMessage(chatId, messageId);
  }

  async onTodoCommands(chatId: number): Promise<void> {
    await this.sendMessage(
      chatId,
      'Выберите действие с тудушкой',
      BUTTONS.TODO_INIT,
    );
  }

  // В падлу размазывать на каждый чих, будет в одном месте все
  async onTodoActions(
    type: string,
    user: ITgCamel.IUser,
    chatId?: number,
    text?: string,
    id?: string,
  ): Promise<void | TodoEntity | TodoEntity[]> {
    try {
      switch (type) {
        case APP.TODO_CRUD.CREATE: {
          await this.todoService.create({
            value: text ?? '',
            cratedBy: user.id,
          });
          break;
        }
        case APP.TODO_CRUD.UPDATE: {
          if (id) {
            await this.todoService.update(id, {
              value: text ?? '',
              updatedBy: user.id,
            });
          }
          break;
        }
        case APP.TODO_CRUD.DELETE: {
          if (id) {
            await this.todoService.delete(id);
          }
          break;
        }
        case APP.TODO_CRUD.GET: {
          return this.todoService.list(user.id);
        }
      }
    } catch (e) {
      this.loggerService.log(`onTodoActions ${type}: `, JSON.stringify(e));
      throw new Error(`onTodoActions ${type}: ${e}`);
    }
  }

  async onUsersCommands(chatId: number): Promise<void> {
    await this.sendMessage(chatId, 'Ты админ Гарри...');
  }

  async moveToNextScene(
    ctx: Context,
    chatId: number,
    action: string,
    nextScene: string,
  ) {
    // ливаем со сцены
    // делаем отдельно ибо это херня лагает, ну или я опять на говнокодил
    await ctx.scene.leave();

    await Promise.all([
      // чистим клаву
      this.clearReplyMarkup(chatId, `Выполняем: ${action}`),
      // летим дальше
      ctx.scene.enter(nextScene),
    ]);
  }

  async clearReplyMarkup(id: number | string, text: string): Promise<void> {
    await this.sendMessage(id, text, BUTTONS.DEL);
  }

  /* PRIVATE - но мне в падлу */
  async sendDefaultButtons(id: number | string): Promise<void> {
    await this.sendMessage(id, 'Базовые команды бота', BUTTONS.DEFAULT);
  }
  /* PRIVATE - но мне в падлу */
  async sendApprovePhoneButton(chatId: string | number): Promise<void> {
    await this.sendMessage(chatId, TEXTS.START_CONTACT, BUTTONS.CONTACT);
  }
  /* PRIVATE - но мне в падлу */
  async sendMessage(
    chatId: string | number,
    text: string,
    extra?: object,
  ): Promise<void> {
    try {
      if (extra && typeof extra === 'object') {
        await this.botService.telegram.sendMessage(chatId, text, extra);
      } else {
        await this.botService.telegram.sendMessage(chatId, text);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Message,
  Ctx,
  Hears,
} from 'nestjs-telegraf';

import { Context, ITgCamel } from '@/common/interfaces';
import { SneakCaseToCamelCasePipe } from '@/common/pipes';

import { APP } from '../constants';
import { TelegramService } from '../telegram.service';

@Scene(APP.TODO)
export class TodoScene {
  constructor(private readonly telegramService: TelegramService) {}
  @SceneEnter()
  async onSceneEnter(
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<string> {
    await this.telegramService.onTodoCommands(chat.id);

    return 'Привет ✋ \n Выбери одно из действий выше или ниже, я хз';
  }

  @SceneLeave()
  onSceneLeave(): string {
    return '--------->';
  }

  @Hears(APP.TODO_CRUD_TEXTS.CREATE)
  async onHearsActionTodoCreate(
    @Ctx() ctx: Context,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    await this.telegramService.moveToNextScene(
      ctx,
      chat.id,
      APP.TODO_CRUD_TEXTS.CREATE,
      APP.TODO_CRUD.CREATE,
    );
  }

  @Hears(APP.TODO_CRUD_TEXTS.UPDATE)
  async onHearsActionTodoUpdate(
    @Ctx() ctx: Context,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    await this.telegramService.moveToNextScene(
      ctx,
      chat.id,
      APP.TODO_CRUD_TEXTS.UPDATE,
      APP.TODO_CRUD.UPDATE,
    );
  }

  @Hears(APP.TODO_CRUD_TEXTS.GET)
  async onHearsActionTodoGet(
    @Ctx() ctx: Context,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    await this.telegramService.moveToNextScene(
      ctx,
      chat.id,
      APP.TODO_CRUD_TEXTS.GET,
      APP.TODO_CRUD.GET,
    );
  }

  @Hears(APP.TODO_CRUD_TEXTS.DELETE)
  async onHearsActionTodoDelete(
    @Ctx() ctx: Context,
    @Message('chat', SneakCaseToCamelCasePipe) chat: ITgCamel.IChat,
  ): Promise<void> {
    await this.telegramService.moveToNextScene(
      ctx,
      chat.id,
      APP.TODO_CRUD_TEXTS.DELETE,
      APP.TODO_CRUD.DELETE,
    );
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }
}

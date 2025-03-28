import { Ctx, Message, On, Sender, Wizard, WizardStep } from 'nestjs-telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { APP } from '@/bots/base/constants';
import { TelegramService } from '@/bots/base/telegram.service';
import { ITgCamel } from '@/common/interfaces';

@Wizard(APP.TODO_CRUD.DELETE)
export class TodoDeleteWizard {
  constructor(private readonly telegramService: TelegramService) {}

  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: WizardContext): Promise<string> {
    // @ts-ignore
    await ctx.wizard.next();

    return 'Загружаем вашу срань';
  }

  @On('text')
  @WizardStep(2)
  async onName(
    @Ctx() ctx: WizardContext,
    @Message() msg: { text: string },
    @Sender() user: ITgCamel.IUser,
  ): Promise<string> {
    await this.telegramService.onTodoActions(
      APP.TODO_CRUD.DELETE,
      user,
      user.id,
      undefined,
      // @ts-ignore
      msg.text,
    );
    // @ts-ignore
    await ctx.scene.leave();

    return 'Done бля';
  }
}

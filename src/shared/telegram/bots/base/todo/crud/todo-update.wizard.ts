import { Ctx, Message, On, Sender, Wizard, WizardStep } from 'nestjs-telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { APP } from 'src/shared/telegram/bots/base/constants';
import { TelegramService } from '@/shared/telegram/bots/base/telegram.service';
import { ITgCamel } from '@/common/interfaces';

@Wizard(APP.TODO_CRUD.UPDATE)
export class TodoUpdateWizard {
  constructor(private readonly telegramService: TelegramService) {}
  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: WizardContext): Promise<string> {
    await ctx.wizard.next();

    return 'Обновляем вашу срань, скинь id';
  }

  @On('text')
  @WizardStep(2)
  async onName(
    @Ctx() ctx: WizardContext,
    @Message() msg: { text: string },
  ): Promise<string> {
    // @ts-ignore
    ctx.wizard.state.id = msg.text;
    // @ts-ignore
    await ctx.wizard.next();

    return 'Ок, теперь введи текст';
  }

  @On('text')
  @WizardStep(3)
  async onLocation(
    @Ctx() ctx: WizardContext & { wizard: { state: { id: string } } },
    @Message() msg: { text: string },
    @Sender() user: ITgCamel.IUser,
  ): Promise<string> {
    await this.telegramService.onTodoActions(
      APP.TODO_CRUD.UPDATE,
      user,
      user.id,
      msg.text,
      // @ts-ignore
      ctx.wizard.state.id,
    );

    await ctx.scene.leave();

    return 'Done';
  }
}

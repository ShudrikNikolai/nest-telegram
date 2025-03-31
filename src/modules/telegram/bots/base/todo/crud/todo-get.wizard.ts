import { Ctx, Sender, Wizard, WizardStep } from 'nestjs-telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { APP } from '@/modules/telegram/bots/base/constants';
import { ITgCamel } from '@/common/interfaces';
import { TelegramService } from '@/modules/telegram/bots/base/telegram.service';

@Wizard(APP.TODO_CRUD.GET)
export class TodoGetWizard {
  constructor(private readonly telegramService: TelegramService) {}

  @WizardStep(1)
  async onSceneEnter(
    @Ctx() ctx: WizardContext,
    @Sender() user: ITgCamel.IUser,
  ): Promise<string> {
    const res = await this.telegramService.onTodoActions(
      APP.TODO_CRUD.GET,
      user,
      user.id,
    );

    await ctx.scene.leave();

    return JSON.stringify(res, null, 2);
  }
}

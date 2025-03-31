import { Ctx, Message, On, Sender, Wizard, WizardStep } from 'nestjs-telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { APP } from 'src/shared/telegram/bots/base/constants';
import { TelegramService } from '@/shared/telegram/bots/base/telegram.service';
import { ITgCamel } from '@/common/interfaces';
// Тут бы с wizard что-нибудь выдумать, чтобы не копипастить,
// но я чет заебался, так что и так пойдет
@Wizard(APP.TODO_CRUD.CREATE)
export class TodoCreateWizard {
  constructor(private readonly telegramService: TelegramService) {}
  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: WizardContext): Promise<string> {
    await ctx.wizard.next();

    return 'Введите свою хуйню, а я уж постараюсь не проебаться...';
  }

  @On('text')
  @WizardStep(2)
  async onName(
    @Ctx() ctx: WizardContext,
    @Message() msg: { text: string },
    @Sender() user: ITgCamel.IUser,
  ): Promise<void> {
    await this.telegramService.onTodoActions(
      APP.TODO_CRUD.CREATE,
      user,
      user.id,
      msg.text,
    );

    await ctx.scene.leave();
  }
}

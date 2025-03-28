import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';

import { UserService } from '@/modules/user/user.service';
import { Context } from '@/common/interfaces/tg-context.interface';

@Injectable()
class AuthUsersGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    if (!from || !from.id) {
      throw new TelegrafException('Invalid id');
    }

    const isAuthUser = await this.userService.findUserByTelegramId(from.id);

    if (!isAuthUser) {
      throw new TelegrafException('User not find');
    }

    return true;
  }
}

export default AuthUsersGuard;

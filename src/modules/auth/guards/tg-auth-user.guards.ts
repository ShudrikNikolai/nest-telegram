import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';

import { UserService } from '@/modules/user/user.service';
import { Context } from '@/common/interfaces/tg-context.interface';
import { RedisKeys } from '@/constants';
import { REDIS_PS } from '@/shared/redis/redis.constant';
import { RedisPSClient } from '@/shared/redis/redis.client';

@Injectable()
class AuthUsersGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    @Inject(REDIS_PS) private readonly redis: RedisPSClient,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    if (!from || !from.id) {
      throw new TelegrafException('Invalid id');
    }

    const userCache = await this.redis.subClient.get(
      `${RedisKeys.AUTH_ID_PREFIX}${from?.id}`,
    );

    let tempUSerCache;

    if (userCache && typeof userCache === 'string') {
      tempUSerCache = JSON.parse(userCache);
      if (tempUSerCache?.phoneApproved) {
        return true;
      }
    }

    const isAuthUser = await this.userService.findUserByTelegramId(from.id);

    if (!isAuthUser?.phoneApproved) {
      throw new TelegrafException('User not find');
    }

    // redis cache example::: hui
    await this.redis.subClient.set(
      `${RedisKeys.AUTH_ID_PREFIX}${isAuthUser?.telegramId}`,
      JSON.stringify(isAuthUser),
    );

    return true;
  }
}

export default AuthUsersGuard;

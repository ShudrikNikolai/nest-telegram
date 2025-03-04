import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';
import { Context } from '@/modules/telegram/interfaces/context.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  private readonly ADMIN_IDS: number[] | undefined =
    this.configService.get('ADMIN_IDS');

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    if (this.ADMIN_IDS) {
      if (!from || !from.id) {
        throw new TelegrafException('Invalid id');
      }

      const isAdmin = this.ADMIN_IDS.includes(from.id);

      if (!isAdmin) {
        throw new TelegrafException('Error parsing admin id');
      }

      return true;
    }

    return false;
  }
}

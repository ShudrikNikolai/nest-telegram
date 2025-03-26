import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

export const UpdateType = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    TelegrafExecutionContext.create(ctx).getContext().updateType,
);

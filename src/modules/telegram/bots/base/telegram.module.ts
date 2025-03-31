import { Module } from '@nestjs/common';

import { UserModule } from '@/modules/user/user.module';
import { TodoModule } from '@/modules/todo/todo.module';
import { LoggerModule } from '@/shared/logger/logger.module';

import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { TodoScene } from '@/modules/telegram/bots/base/todo/todo.scene';
import { TodoCrudServices } from '@/modules/telegram/bots/base/todo/todo.services';

@Module({
  imports: [UserModule, TodoModule, LoggerModule],
  providers: [TelegramUpdate, TelegramService, TodoScene, ...TodoCrudServices],
})
export class TelegramModule {}

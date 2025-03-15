import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}

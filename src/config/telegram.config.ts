import { ConfigType, registerAs } from '@nestjs/config';
import { env, envArrayNumber } from '@/global/env';

export const telegramRegToken = 'telegram';

export const TelegramConfig = registerAs(telegramRegToken, () => ({
  name: env('TELEGRAM_NAME'),
  token: env('TELEGRAM_TOKEN'),
  username: env('TELEGRAM_USERNAME'),
  usersAdmin: envArrayNumber('TELEGRAM_USERS_ADMIN'),
}));

export type ITelegramConfig = ConfigType<typeof TelegramConfig>;

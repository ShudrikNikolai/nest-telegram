import { ConfigType, registerAs } from '@nestjs/config';
import { env } from '@/global/env';

export const memeTgRegToken = 'memetg';

export const MemeTgConfig = registerAs(memeTgRegToken, () => ({
  name: env('MEME_NAME'),
  token: env('MEME_TOKEN'),
  username: env('MEME_USERNAME'),
}));

export type IMemeTgConfig = ConfigType<typeof MemeTgConfig>;

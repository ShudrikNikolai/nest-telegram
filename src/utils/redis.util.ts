import type { RedisKeys } from '@/constants/cache.constant';

type Prefix = 'tg';
const prefix = 'tg';

export function getRedisKey<T extends string = RedisKeys | '*'>(
  key: T,
  ...concatKeys: string[]
): `${Prefix}:${T}${string | ''}` {
  return `${prefix}:${key}${
    concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''
  }`;
}

import { Inject, Injectable } from '@nestjs/common';

import { REDIS_PS } from './redis.constant';
import { RedisPSClient } from './redis.client';

@Injectable()
export class RedisPubSubService {
  constructor(@Inject(REDIS_PS) private readonly redisSubPub: RedisPSClient) {}

  public async publish(event: string, data: any) {
    return this.redisSubPub.publish(event, data);
  }

  public async subscribe(event: string, callback: (data: any) => void) {
    return this.redisSubPub.subscribe(event, callback);
  }

  public async unsubscribe(event: string, callback: (data: any) => void) {
    return this.redisSubPub.unsubscribe(event, callback);
  }
}

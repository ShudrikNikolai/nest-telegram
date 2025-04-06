import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    // redis
    RedisModule,
    // logger
    LoggerModule.forRoot(),
    // http
    HttpModule,
  ],
  exports: [HttpModule, LoggerModule, RedisModule],
})
export class SharedModule {}

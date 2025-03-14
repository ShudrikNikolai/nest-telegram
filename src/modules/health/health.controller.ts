import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HEALTH')
@Controller('health')
export class HealthController {
  constructor(
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get('network')
  @HealthCheck()
  async checkNetwork() {
    return this.http.pingCheck('google', 'https://google.com', {
      timeout: 800,
    });
  }

  @Get('database')
  @HealthCheck()
  async checkDatabase() {
    return this.db.pingCheck('database', { timeout: 1500 });
  }

  @Get('memory-heap')
  @HealthCheck()
  async checkMemoryHeap() {
    return this.memory.checkHeap('memory-heap', 150 * 1024 * 1024);
  }

  @Get('memory-rss')
  @HealthCheck()
  async checkMemoryRSS() {
    return this.memory.checkRSS('memory-rss', 150 * 1024 * 1024);
  }

  @Get('disk')
  @HealthCheck()
  async checkDisk() {
    return this.disk.checkStorage('storage', {
      threshold: 250 * 1024 * 1024 * 1024,
      path: '/',
    });
  }
}

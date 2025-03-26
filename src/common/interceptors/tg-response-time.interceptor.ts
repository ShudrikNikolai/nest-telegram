import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@/shared/logger/logger.service';

@Injectable()
export class TgResponseTimeInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.loggerService.log(`Response time: ${Date.now() - start}ms`),
        ),
      );
  }
}

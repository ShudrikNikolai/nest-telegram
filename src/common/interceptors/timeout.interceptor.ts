import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { LoggerService } from '@/shared/logger/logger.service';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    private readonly time: number = 10000,
    private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.time),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => {
            this.loggerService.error(err.message);
            new RequestTimeoutException('Timeout Exception');
          });
        }

        this.loggerService.error('TimeoutInterceptor: ', err);

        return throwError(() => err);
      }),
    );
  }
}

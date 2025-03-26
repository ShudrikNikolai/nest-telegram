import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TgUpdaterPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: any) {}
  transform(value: any, metadata: ArgumentMetadata) {}
}

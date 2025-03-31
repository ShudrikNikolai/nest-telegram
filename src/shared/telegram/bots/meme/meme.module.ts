import { Module } from '@nestjs/common';
import { MemeTgUpdate } from './meme.update';
import { MemeService } from './meme.service';

@Module({
  imports: [],
  providers: [MemeTgUpdate, MemeService],
})
export class MemeTgModule {}

import { Column, Entity } from 'typeorm';

import { CompleteEntity } from '@/common/entities/common.entity';

@Entity('todo')
export class TodoEntity extends CompleteEntity {
  @Column()
  value: string | null = null;

  @Column({ default: false })
  status: boolean = false;

  @Column()
  telegramId: number;

  constructor() {
    super();
  }
}

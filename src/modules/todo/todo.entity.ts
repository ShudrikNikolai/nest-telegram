import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CompleteEntity } from '@/common/entities/common.entity';
import { UserEntity } from '@/modules/user/user.entity';

@Entity('todo')
export class TodoEntity extends CompleteEntity {
  @Column()
  @ApiProperty({ description: 'value' })
  value: string | null = null;

  @ApiProperty({ description: 'status' })
  @Column({ default: false })
  status: boolean = false;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'telegramId' })
  user: Relation<UserEntity>;

  constructor() {
    super();
  }
}

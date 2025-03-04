import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CompleteEntity } from '@/common/entitiy/common.entity';
import { UserEntity } from '@/modules/user/user.entity';

@Entity('todo')
export class TodoEntity extends CompleteEntity {
  @Column()
  @ApiProperty({ description: 'value' })
  value: string;

  @ApiProperty({ description: 'status' })
  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'telegramId' })
  user: Relation<UserEntity>;

  constructor() {
    super();
  }
}

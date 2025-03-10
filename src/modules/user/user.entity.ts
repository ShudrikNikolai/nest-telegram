import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@/common/entitiy/common.entity';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @Column({ unique: true })
  telegramId: number;
}

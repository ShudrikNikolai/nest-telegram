import { Column, Entity, Index } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entity';

@Index(['telegramId', 'username'])
@Index(['telegramId', 'phoneApproved'])
@Index(['telegramId', 'status'])
@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column({ nullable: true })
  lastName: string | null = null;

  @Column({ nullable: true })
  firstName: string | null = null;

  @Column({ nullable: true })
  username: string;

  @Column({ name: 'avatar', nullable: true, default: null })
  avatar: string | null = null;

  @Column({ nullable: true, default: null })
  phone: string | null = null;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number = 1;

  @Column({ unique: true })
  telegramId: number;

  @Index()
  @Column({ nullable: false, default: false })
  phoneApproved: boolean = false;
}

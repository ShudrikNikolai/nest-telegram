import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@/common/entitiy/common.entity';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ name: 'avatar', nullable: true, default: null })
  avatar: string | null = null;

  @Column({ nullable: true, default: null })
  phone: string | null = null;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @Column({ unique: true })
  telegramId: number;

  @Column({ nullable: false, default: false })
  phoneApproved: boolean = false;
}

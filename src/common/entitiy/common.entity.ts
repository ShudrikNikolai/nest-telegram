import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date = new Date();
}

export abstract class CompleteEntity extends CommonEntity {
  @ApiHideProperty()
  @Exclude()
  @Column({
    name: 'createdBy',
    update: false,
    nullable: true,
  })
  createdBy: number;

  @ApiHideProperty()
  @Exclude()
  @Column({ name: 'updatedBy', nullable: true })
  updatedBy: number;
}

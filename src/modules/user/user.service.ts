import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(): Promise<void> {}

  async update(id: number): Promise<void> {}

  async info(id: number) {}

  async delete(userIds: number[]) {}

  async findUserByTelegramId(id: number) {
    return true;
  }
}

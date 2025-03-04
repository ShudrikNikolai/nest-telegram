import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';

import { TodoEntity } from '@/modules/todo/todo.entity';
import { TodoDto, TodoUpdateDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async list(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async detail(id: ObjectId): Promise<TodoEntity> {
    const item = await this.todoRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    return item;
  }

  async create(dto: TodoDto) {
    console.log('create value >>>', dto);
    const res = await this.todoRepository.save(dto);

    console.log('create res >>>', res);

    return res;
  }

  async update(id: ObjectId, dto: TodoUpdateDto) {
    await this.todoRepository.update(id, dto);
  }

  async delete(id: ObjectId) {
    const item = await this.detail(id);

    await this.todoRepository.remove(item);
  }
}

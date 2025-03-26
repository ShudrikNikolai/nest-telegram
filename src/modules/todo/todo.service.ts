import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';

import { TodoDto, TodoUpdateDto } from './dto/todo.dto';
import { TodoEntity } from './todo.entity';

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
    return this.todoRepository.save(dto);
  }

  async update(id: ObjectId, dto: TodoUpdateDto) {
    await this.todoRepository.update(id, dto);
  }

  async delete(id: ObjectId) {
    const item = await this.detail(id);

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    await this.todoRepository.remove(item);
  }
}

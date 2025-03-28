import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb'; // <- в падлу с этой хуйней разбираться

import { TodoDto, TodoUpdateDto } from './dto/todo.dto';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: MongoRepository<TodoEntity>,
  ) {}

  async list(user: number): Promise<TodoEntity[]> {
    return this.todoRepository.find({ where: { user } });
  }

  async detail(id: string): Promise<TodoEntity> {
    const item = await this.todoRepository.findOneBy({ _id: new ObjectId(id) });

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    return item;
  }

  async create(dto: TodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(dto);
  }

  async update(id: string, data: TodoUpdateDto) {
    await this.todoRepository.update(id, data);
  }

  async delete(id: string) {
    const item = await this.detail(id);

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    await this.todoRepository.delete(id);
  }
}

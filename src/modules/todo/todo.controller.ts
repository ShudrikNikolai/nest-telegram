import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { TodoEntity } from '@/modules/todo/todo.entity';

import { TodoDto, TodoUpdateDto } from './todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Business - Todo module')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'get all todo' })
  async list(): Promise<TodoEntity[]> {
    return this.todoService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get todo by id' })
  async info(id: ObjectId): Promise<TodoEntity> {
    return this.todoService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: 'create todo' })
  async create(@Body() dto: TodoDto): Promise<void> {
    await this.todoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update by id todo' })
  async update(id: ObjectId, @Body() dto: TodoUpdateDto): Promise<void> {
    await this.todoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete todo' })
  async delete(id: ObjectId): Promise<void> {
    await this.todoService.delete(id);
  }
}

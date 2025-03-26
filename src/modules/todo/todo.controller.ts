import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';

@ApiTags('Todo module')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
}

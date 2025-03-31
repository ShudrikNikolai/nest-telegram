import { TodoCreateWizard } from './crud/todo-create.wizard';
import { TodoUpdateWizard } from './crud/todo-update.wizard';
import { TodoDeleteWizard } from './crud/todo-delete.wizard';
import { TodoGetWizard } from './crud/todo-get.wizard';
// Эту хуйню можно вообще оформить в отдельный модуль
// НО мне это в падлу делать
export const TodoCrudServices = [
  TodoCreateWizard,
  TodoUpdateWizard,
  TodoDeleteWizard,
  TodoGetWizard,
];

import { TodoCreateWizard } from '@/modules/telegram/bots/base/todo/crud/todo-create.wizard';
import { TodoUpdateWizard } from '@/modules/telegram/bots/base/todo/crud/todo-update.wizard';
import { TodoDeleteWizard } from '@/modules/telegram/bots/base/todo/crud/todo-delete.wizard';
import { TodoGetWizard } from '@/modules/telegram/bots/base/todo/crud/todo-get.wizard';
// Эту хуйню можно вообще оформить в отдельный модуль
// НО мне это в падлу делать
export const TodoCrudServices = [
  TodoCreateWizard,
  TodoUpdateWizard,
  TodoDeleteWizard,
  TodoGetWizard,
];

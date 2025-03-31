import { TODO_CRUD, TODO_CRUD_TEXTS } from './app.constant';

export const CONTACT: object = {
  reply_markup: {
    keyboard: [
      [
        {
          text: 'Отправить Телефонный номер',
          request_contact: true,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
  parse_mode: 'Markdown',
};

export const DEL: object = {
  reply_markup: {
    remove_keyboard: true,
  },
};

export const DEFAULT: object = {
  reply_markup: {
    keyboard: [],
  },
};

export const TODO_INIT: object = {
  reply_markup: {
    keyboard: [
      [
        {
          text: TODO_CRUD_TEXTS.CREATE,
          callback_data: TODO_CRUD.CREATE,
        },
        {
          text: TODO_CRUD_TEXTS.UPDATE,
          callback_data: TODO_CRUD.UPDATE,
        },
      ],
      [
        {
          text: TODO_CRUD_TEXTS.GET,
          callback_data: TODO_CRUD.GET,
        },
        {
          text: TODO_CRUD_TEXTS.DELETE,
          callback_data: TODO_CRUD.DELETE,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

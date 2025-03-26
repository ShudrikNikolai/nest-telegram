export interface IFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IChat {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
}

export interface IContact {
  last_name: string;
  first_name: string;
  user_id: number;
  phone_number: string;
}

export interface IMessage {
  message_id: number;
  from: IFrom;
  chat: IChat;
  date: Date;
  text: string;
  entities: [];
  contact: IContact;
}

export interface CtxUpdate {
  update_id: number;
  message: IMessage;
}

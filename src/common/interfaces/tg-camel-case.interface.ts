export interface IChat {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  type: string;
}

export interface IUser {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
}

export interface IContact {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userId: number;
}

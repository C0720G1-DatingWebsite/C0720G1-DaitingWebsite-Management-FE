import {IAccount} from './account';
import {IChat} from './chat';

export interface IAccountChat {
  id: number;
  content: string;
  date: string;

  account: IAccount;
  chat: IChat;
}

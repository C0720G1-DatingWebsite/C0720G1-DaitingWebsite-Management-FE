import {IChat} from './chat';

export interface IChatType {
  id: number;
  name: string;

  chatList: IChat[];
}

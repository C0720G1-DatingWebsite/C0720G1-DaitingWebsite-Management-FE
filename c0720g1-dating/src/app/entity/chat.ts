import {IChatType} from './chat-type';
import {IAccountChat} from './account-chat';

export interface IChat {
  id: number;
  name: string;

  chatType: IChatType;
  accountChatList: IAccountChat[];
}

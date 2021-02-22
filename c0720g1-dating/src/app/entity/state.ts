import {IFriend} from './friend';

export interface IState {
  id: number;
  name: string;

  friendList: IFriend[];
}

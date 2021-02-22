import {IAccount} from './account';
import {IState} from './state';

export interface IFriend {
  id: number;

  account: IAccount;
  friend: IAccount;
  state: IState;
}

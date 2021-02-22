import {IAccount} from './account';

export interface IFeedback {
  id: number;
  content: string;
  date: string;
  status: boolean;

  account: IAccount;
}

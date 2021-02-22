import {IAccount} from './account';

export interface IJob {
  id: number;
  name: string;

  accountList: IAccount[];
}

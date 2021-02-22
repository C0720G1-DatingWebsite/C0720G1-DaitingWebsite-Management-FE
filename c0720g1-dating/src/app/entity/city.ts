import {IAccount} from './account';

export interface ICity {
  id: number;
  name: string;

  accountList: IAccount[];
}
